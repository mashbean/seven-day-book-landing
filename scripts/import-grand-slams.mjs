#!/usr/bin/env node
/**
 * Import Grand Slams from observablehq snapshot
 *
 * 為什麼有這個 script：
 *   - `scripts/refresh-marathoners.mjs` 用 Matters public GraphQL 對 21 期
 *     paginate 撈 articles 計算，但實測會嚴重低估（5-25 期算出 276 次，但
 *     observablehq notebook 直連 DB 算出 673 次，落差 397 次）。
 *   - 落差原因推測：GraphQL public schema 不會列出被作者隱藏 / 撤回 / 刪除
 *     的文章，而 observablehq 直接看 DB audit_log 跟原始 campaign_article
 *     表，看到全部。
 *   - 另外早期 1-4 期沒有 campaign hash，GraphQL 完全無法撈。
 *
 * 結論：observablehq 的數字才是發 NFT 大滿貫徽章的 ground truth。
 *
 * 流程：
 *   1. 從 `research/freewrite-grand-slams-observablehq.json` 讀完整 464 位
 *      大滿貫得主名單（由 observablehq notebook "Event - 七日書大滿貫" 的
 *      `history` table 匯出）
 *   2. 對 top 50 用 Matters GraphQL 撈 avatar / displayName 補充
 *   3. 產出 `src/data/freewrite-marathoners.ts`，欄位：
 *      - totalGrandSlams (sum of all 大滿貫次數)
 *      - totalUniqueGrandSlamWinners (464)
 *      - 各期分布 perCampaignGrandSlams
 *      - Top 50 marathoners 詳細資料
 *
 * 更新時機：
 *   - observablehq notebook 重跑（通常每期完結後）→ 重新匯出 history JSON
 *     → 蓋掉 `research/freewrite-grand-slams-observablehq.json` →
 *     `node scripts/import-grand-slams.mjs --write` 自動更新 marathoners.ts
 *   - 月排程：等 observablehq 出 publish API 之後，可以接成自動拉
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const SRC = path.join(REPO_ROOT, "research/freewrite-grand-slams-observablehq.json");
const OUT = path.join(REPO_ROOT, "src/data/freewrite-marathoners.ts");
const ENDPOINT = "https://server.matters.town/graphql";

// 期數對應 campaign shortHash（5-25 期）
// 1-4 期沒 hash，但仍出現在 observablehq 名單裡
const CAMPAIGN_HASH = {
  5: "ia800figcq9y",
  6: "ybs0lqsrpmhn",
  7: "scx3f16y37v6",
  8: "8t5liudbtpup",
  9: "eqsfuc3qph6u",
  10: "x4rv6dwgk68o",
  11: "f7rpyecg32mg",
  12: "4nqnizsygmcn",
  13: "26uhbm3uh6rg",
  14: "efkk0l9hcg96",
  15: "h2ya9xxjubd2",
  16: "5zhf2bpty274",
  17: "rt04oolqbexh",
  18: "owt3jxplay6z",
  19: "3uskpxsbzmz5",
  20: "ox9fmcz6zxxj",
  21: "nqbeo3cdn585",
  22: "4v5mndkbz44v",
  23: "q48dv6ve4g2m",
  24: "aiafcgbu89p2",
  25: "wem6xy6u7okv",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function graphql(query, variables = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });
      const json = await res.json();
      if (json.errors) throw new Error(json.errors.map((e) => e.message).join("; "));
      return json.data;
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(1000 * attempt);
    }
  }
}

const USER_QUERY = `
  query($userName: String!) {
    user(input: { userName: $userName }) {
      userName
      displayName
      avatar
    }
  }
`;

async function fetchUserDetails(userName) {
  const data = await graphql(USER_QUERY, { userName });
  return data.user; // null if not found
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const shouldWrite = args.has("--write");

  if (!fs.existsSync(SRC)) {
    console.error(`✗ Missing ${path.relative(REPO_ROOT, SRC)}`);
    console.error(`  Export Table 2 from observablehq notebook as JSON first.`);
    process.exit(1);
  }
  const rows = JSON.parse(fs.readFileSync(SRC, "utf-8"));
  console.log(`\n=== Import Grand Slams (${rows.length} 用戶 from observablehq) ===\n`);

  // 統計
  const totalGrandSlams = rows.reduce((s, r) => s + r["大滿貫次數"], 0);
  const totalUniqueGrandSlamWinners = rows.length;
  const perCampaign = {};
  for (const r of rows) {
    for (const cid of r["大滿貫"]) {
      perCampaign[cid] = (perCampaign[cid] || 0) + 1;
    }
  }

  console.log(`  總大滿貫次數          : ${totalGrandSlams}`);
  console.log(`  獨立得主              : ${totalUniqueGrandSlamWinners}`);
  console.log(`  涵蓋期數              : 1–25 (含 1-4 早期)\n`);

  // Top 50 by 大滿貫次數 desc, tie-break by userName for stable ordering
  const top = [...rows]
    .sort((a, b) => b["大滿貫次數"] - a["大滿貫次數"] || a["Matters ID"].localeCompare(b["Matters ID"]))
    .slice(0, 50);

  console.log(`Fetching avatars for Top 50 from Matters GraphQL...`);
  const enriched = [];
  for (const [i, r] of top.entries()) {
    const matterId = r["Matters ID"];
    let avatar = null;
    let displayName = r["用戶名"];
    try {
      const u = await fetchUserDetails(matterId);
      if (u) {
        avatar = u.avatar;
        displayName = u.displayName || displayName;
      }
    } catch (err) {
      console.warn(`  ⚠ ${matterId}: ${err.message}`);
    }
    // 三日書期數每期 3 篇起跳大滿貫，其餘 7 篇
    const SPECIAL_3DAY = new Set([6, 14, 15, 16, 17]); // 三日書期數
    const minArticles = r["大滿貫"].reduce(
      (sum, cid) => sum + (SPECIAL_3DAY.has(Number(cid)) ? 3 : 7),
      0,
    );
    enriched.push({
      userName: matterId,
      displayName,
      avatar,
      grandSlams: r["大滿貫次數"],
      grandSlamCampaigns: r["大滿貫"]
        .map((cid) => CAMPAIGN_HASH[Number(cid)] || `#${cid}`)
        .sort(),
      totalArticles: minArticles,
      campaignsParticipated: r["大滿貫次數"],
    });
    process.stdout.write(`\r  ${i + 1}/${top.length}`);
    await sleep(100);
  }
  console.log(""); // newline

  console.log(`\n=== Top 10 ===`);
  for (const [i, m] of enriched.slice(0, 10).entries()) {
    console.log(`  ${String(i + 1).padStart(2)}. ${m.displayName.padEnd(20, "　")} ${String(m.grandSlams).padStart(2)} 次大滿貫`);
  }

  console.log(`\n=== 每期分布 ===`);
  for (const cid of Object.keys(perCampaign).sort((a, b) => Number(a) - Number(b))) {
    console.log(`  期 #${String(cid).padStart(2)} : ${perCampaign[cid]} 位`);
  }

  if (!shouldWrite) {
    console.log(`\n(dry-run — 加 --write 寫入 ${path.relative(REPO_ROOT, OUT)})`);
    return;
  }

  // 產出 marathoners.ts
  const today = new Date().toISOString().slice(0, 10);
  const ts = (v) => JSON.stringify(v);
  const perCampaignLines = Object.keys(perCampaign)
    .sort((a, b) => Number(a) - Number(b))
    .map((cid) => `  { campaign: ${String(cid).padStart(2)}, count: ${perCampaign[cid]} },`);

  const content = [
    `// 七日書馬拉松選手 — ground truth from observablehq notebook (${today})`,
    `// Source: https://observablehq.com/d/3959b9c8a57f4bb9 (Event - 七日書大滿貫)`,
    `// notebook 直連 Matters prod replica DB 計算，比 public GraphQL 完整`,
    `// （GraphQL 不會列出被隱藏 / 撤回的文章；observablehq 看得到 audit_log）`,
    `// 重新匯出流程：observablehq history table → Export as JSON →`,
    `// 蓋掉 research/freewrite-grand-slams-observablehq.json →`,
    `// node scripts/import-grand-slams.mjs --write`,
    ``,
    `export interface Marathoner {`,
    `  userName: string;          // Matters handle (e.g. "boxuan0531")`,
    `  displayName: string;       // user-facing name`,
    `  avatar: string | null;`,
    `  grandSlams: number;        // 累計拿到大滿貫的期數`,
    `  grandSlamCampaigns: string[]; // 那幾期 campaign shortHash（早期 1-4 用 "#1"-"#4"）`,
    `  /** 至少投稿的文章數（每次大滿貫 = 7 篇下限；三日書期數 = 3 篇下限，估算偏保守） */`,
    `  totalArticles: number;`,
    `  /** 至少參與過的期數（等於 grandSlams，因為這只列大滿貫者） */`,
    `  campaignsParticipated: number;`,
    `}`,
    ``,
    `export const totalGrandSlams = ${totalGrandSlams};`,
    `export const totalUniqueGrandSlamWinners = ${totalUniqueGrandSlamWinners};`,
    `export const eventCount = 25;`,
    ``,
    `/** 各期大滿貫人數（按期數遞增）*/`,
    `export const perCampaignGrandSlams = [`,
    ...perCampaignLines,
    `];`,
    ``,
    `/** Top 50 marathoners by 累計大滿貫次數 */`,
    `export const marathoners: Marathoner[] = [`,
    ...enriched.map(
      (m) =>
        `  { userName: ${ts(m.userName)}, displayName: ${ts(m.displayName)}, avatar: ${m.avatar ? ts(m.avatar) : "null"}, grandSlams: ${m.grandSlams}, grandSlamCampaigns: ${ts(m.grandSlamCampaigns)}, totalArticles: ${m.totalArticles}, campaignsParticipated: ${m.campaignsParticipated} },`,
    ),
    `];`,
    ``,
  ].join("\n");

  fs.writeFileSync(OUT, content, "utf-8");
  console.log(`\n✓ 寫入 ${path.relative(REPO_ROOT, OUT)}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
