# 七日書 Landing 對 freewrite-design-system 差距審計

**日期**：2026-05-08
**Auditor**：Claude（Opus 4.7）
**來源**：thematters/design-system PR #53 已 merge — `docs/freewrite-design-system/` (7 份原則文件) + `components/freewrite/*/spec.md` (7 份元件) + `brand/sources/figma/cc-branding/exports/freewrite/*/MANIFEST.md` (15 頁素材索引)
**Live 對照**：commit `cbfda00` 部署的 `https://thematters.github.io/seven-day-book-landing/{,partners/,archive/}`

> ⚠️ **不改任何 live 檔**。此 audit 僅紀錄差距、優先序、引用條文。實作待你批註後逐項做 PR。

---

## 0. 用色與字型紅線檢查（跨三頁）

從 live `_astro/_slug_.gXEPgD4I.css` 與 HTML head 抓取：

| 項目 | DS 規範 | 實際 live | 結論 |
|---|---|---|---|
| Display 字型 | `jf-jinxuan` Bold（[typography.md §字型](../docs/freewrite-design-system/typography.md)） | `<link href="fonts.googleapis.com/css2?family=Noto+Serif+TC">` | ❌ **違規 typography.md 第 1 項** — 全部 H1/H2/H3 用 Noto Serif TC，跟 POAP / day-prompt-card / season-hero 的 jf-jinxuan 220px 系列脫節 |
| Body 字型 | 主系統（PingFang TC / Source Han Sans TC） | `font-family: PingFang TC, system-ui, sans-serif` | ✅ |
| 字重 | matters-ds 上限 600 (semibold) | `font-weight: 400/500/600` 各 ~18 處 | ✅（commit `8552e8f` 已修） |
| Brand 紫 `#7258FF` | 不可放 freewrite surface（[color-usage.md §用色限制 1](../docs/freewrite-design-system/color-usage.md)） | tokens 有宣告但 0 處實際 selector 使用 | ✅ |
| Brand 綠 `#C3F432` | 同上 | 0 處實際使用 | ✅ |
| Brand 舊綠 `#0D6763` 系列 | 七日書不用 | 0 處實際使用 | ✅ |
| 4 個 freewrite token | `--color-freewrite-{background,text,text-dark,label}` 為唯一允許範圍 | 全部對齊 | ✅ |
| 博物館頁 accent `#69cdf0` | 不在 token 內 | 已寫死 | ⚠️ **使用者已決定保留**（區隔三頁差異），但需文件化為 `--museum-*` 局部 token，避免 drift；不上推到 freewrite token 系統 |

---

## A. Section by Section · `/`（寫作者頁）

對照「2025 年度總結 8-section 架構」（[seasonal-themes.md §設計演進](../docs/freewrite-design-system/seasonal-themes.md) + [illustration-style.md §6 對 freewrite landing 的暗示](../docs/freewrite-design-system/illustration-style.md)）：

| 既有 Section | 對應 DS 元件 / 原則 | 對齊度 | 違規 / 建議 |
|---|---|---|---|
| **Hero**（H1 上方 banner img） | `season-hero` 元件 | 🟡 部分 | image 用 imagedelivery campaignCover 走「主視覺軌」OK；但 hero **沒有 `<seven-day-book-logo>` SVG** — 違反 [layout-principles.md §6](../docs/freewrite-design-system/layout-principles.md)「logo 角落、不上色」與 [logo spec §Usage rules](../components/freewrite/logo-seven-day-book/spec.md)。目前用 `MattersWordmark + 「七日書」` 純文字 — 跟 POAP / day-prompt-card / 所有 Figma 主視覺脫節 |
| **Hero 動態 live line** | （無對應 spec） | 🟡 中性 | 「2026 年 5 月 七日書 · 我的職場人格 · 現正進行中」帶呼吸動畫 — DS 沒禁止，但語氣輕快，跟 freewrite「contemplative 寫作」調性偏離（[illustration-style.md §2 don't 4](../docs/freewrite-design-system/illustration-style.md)）。建議降低動畫幅度或改為靜態 |
| `#stats` — 4 metric + avatar marquee | participant wall 簡化版 | 🔴 重做 | 4 個數字框 + 頭像滾動，**不是** [participant-wall spec](../components/freewrite/participant-wall/spec.md) 的「12 instance × 4 children（背景紋理 / 評論主文 / 用戶頭像 / 用戶名）」結構。**缺核心元件 participant-wall**（spec 主源是 2025 總結 12 個 Comments Review，imageHash `62513104…`） |
| `#current` — 7 day prompt 卡 | `day-prompt-card` 元件 | 🔴 違規 | day-unlock-card 是 248px wide 白底卡片、無漸層、無大標題、無 logo、用 `font-reading: Noto Serif TC` — **同時違反** [day-prompt-card spec §Layout](../components/freewrite/day-prompt-card/spec.md)（IG 1080×1350、LINEAR_GRADIENT、jf-jinxuan Bold 80-140px、logo 角標）+ [layout-principles.md §2](../docs/freewrite-design-system/layout-principles.md) 模板軌定義。**這是 component-index.md 排第一順位的元件，但實作離 spec 最遠** |
| `#articles` — 12 拖移卡片 | （無對應 spec — 接近品牌模板「3. 文章金句_IG」候選） | 🟡 中性 | 拖移 + 翻面 UX 是 blog-pro port，DS 沒禁止；但 [layout-principles.md §4](../docs/freewrite-design-system/layout-principles.md) 「新元件提案時必須對應到 6 類之一」— 這個 component 沒對應到「1. 好文精選」「3. 文章金句」其一，建議命名為 `freewrite-feature-article-card`（候選 spec [#component-index §未開 spec 候選 1](../docs/freewrite-design-system/component-index.md)） |
| `#badge` — GrandBadge 大滿貫面板 | `badge` + `poap` 元件 | 🟡 部分 | GrandBadge SVG 風格接近 POAP grand-slam（imageHash `b28b5ace…`、`#ffe367` 黃）— 視覺對齊 OK；但 [poap spec §Layout](../components/freewrite/poap/spec.md) 的 jf-jinxuan 220px 標題「{季節主題}」+ scribble 裝飾沒有重現。badge spec 屬「概要級」尚未完整，本段保持現況可接受 |
| `#themes` — 4 張 × 3 頁分頁 | （無對應 spec — 是 landing-only 視圖） | ✅ 對齊 | 用 `announceCover`（image 軌）、月份 label、分頁點點 — 結構乾淨，符合 [seasonal-themes.md §跨季節元件 reuse](../docs/freewrite-design-system/seasonal-themes.md) 的精神 |
| `#lectures` — 16 講者 4×4 dense grid | （無 lecture spec — 對應品牌模板「5. 講座摘要」） | 🟡 部分 | 講者頭像已拿掉（user 決定）、純文字 stacked — DS 沒專用元件，但 [layout-principles.md §4](../docs/freewrite-design-system/layout-principles.md) 「6 類分類」第 5 類就是「講座摘要」（6 frames），這 16 張卡可命名為 `freewrite-lecture-summary-card` |
| `#milestones` — 6 timeline + image | （無對應 spec — 接近年度回顧的 stats infographic） | ✅ 對齊 | 從 freewrite 帳號公告抽出來的 cover image 連回原文，符合 [layout-principles.md §8 整年敘事](../docs/freewrite-design-system/layout-principles.md)「一年作為一個敘事單位」 |
| `#faq` — accordion | （無對應） | ✅ 對齊 | 中性元件 |
| **CTA band** | （activity-banner 的 page-bottom 變體） | 🟡 部分 | 漸層藍紫 cta-band 跟 [activity-banner spec](../components/freewrite/activity-banner/spec.md) 的 688×160 雖尺寸不同，但精神可借用 — banner 應引導到 day prompt 入口、文字精簡 |

**`/` 缺的 section（從 2025 總結 8 段地圖比對）**：

| 缺的 | 對應 DS 元件 | 在哪能加 |
|---|---|---|
| **Quote carousel** | 品牌模板「3. 文章金句_IG」18 instance | `#articles` 之後或之前加一段「文友金句」— 從 latestArticles 抽 quote 字段 |
| **Writers wall**（作家集結） | 2025 總結「邀約過的 14 位作家集結圖」`5495:40` | `#lectures` 區塊上方或合併 — 16 位講者拍成 grid 名片 |
| **Reflection cards**（書後感） | 品牌模板「4. 書後感關鍵字」 | 跟 milestones 合段或新增段 |
| **Keywords viz** | 同上 | 可選；資料來源 = 各期主題 + tag |

---

## B. Section by Section · `/partners/`

| Section | 對應 DS | 對齊度 | 備註 |
|---|---|---|---|
| Hero（image stacked） | `season-hero` | 🟡 部分 | 改用「說聲告別」`94525f57…` campaignCover OK；同 hero logo SVG 缺 |
| `#themes` — 24 row 列表 | （landing-only 變體） | ✅ 對齊 | 用 announceCover、月份、participants 數字、series 標 — 結構紮實 |
| `#execution` — 3 step flow | （無對應 spec） | ✅ 對齊 | 中性敘事元件 |
| `#impact` — 4 metric + 4 signal | participant wall 簡化 | 🟡 部分 | 同 `/` 的 stats，缺真正的 participant-wall instance |
| `#lectures` — 16 講者 dense grid | 講座摘要候選 | 🟡 部分 | 同 `/` |
| `#articles` — 12 卡片堆 | feature-article-card 候選 | 🟡 部分 | 同 `/` |
| `#case` — 兩廳院 case study + gallery | （無對應 — 是 partner-only 變體） | ✅ 對齊 | 三張圖 gallery + relatedArticles 連結，緊扣 freewrite 在 [seasonal-themes.md §2025 8-9](../docs/freewrite-design-system/seasonal-themes.md) 的「對外品牌正式輸出」位置 |
| `#packages` — 3 個 GrandBadge 卡 | `badge` × 3 | 🟡 部分 | 三張都用 GrandBadge 暫代 — caveat 文已刪（user 決定）。後續 [component-index.md §Phase G 後續工作](../docs/freewrite-design-system/component-index.md) 規劃出 4 個新元件（quote-card / feature-article-card / keyword-viz / conversation），其中沒有「主題共創 / 名家講座 / 書寫憑證」的對應 — 這 3 個 partner-page 標籤是 **landing 專屬抽象**，建議仍以 GrandBadge + 不同色票區分（不要回去用 AI placeholder JPG） |
| `#faq` | 中性 | ✅ |
| CTA band | activity-banner 變體 | 🟡 部分 | 同 `/` |

---

## C. Section by Section · `/archive/`（七日書博物館，深色版）

| Section | 對應 DS | 對齊度 | 備註 |
|---|---|---|---|
| Archive hero | `season-hero` 變體 | 🟡 部分 | 深色底 + radial gradient — DS 沒明確規範深色 hero（[illustration-style.md](../docs/freewrite-design-system/illustration-style.md) 的 hero 多為淺底紋理）。**user 決定保留博物館深色風**，OK，但需註記為 freewrite 的「站方 archive」變體、非季節主視覺 |
| 24 archive cards 圖片牆 | 接近 user-templates 的 6 張 cover pack 概念 | ✅ 對齊 | 每張卡片是 4:3 contain + announceCover — 符合 [illustration-style.md §1 留白為主](../docs/freewrite-design-system/illustration-style.md) |
| CTA band ghost | 中性 | ✅ |

**`/archive/` 沒違反 DS 大原則**，是三頁中差距最小的。深色 accent `#69cdf0` 雖不在 token，但已有 `--museum-*` 局部 token，建議加註解 link 到 [color-usage.md §批次 3 一次性 campaign](../docs/freewrite-design-system/color-usage.md) 的「inline custom property 路徑」。

---

## D. 跨頁一致性審計

| 項目 | 規範 | `/` | `/partners/` | `/archive/` |
|---|---|---|---|---|
| 七日書 logo SVG（dark/white） | [logo spec](../components/freewrite/logo-seven-day-book/spec.md)：259×119、dark on light / white on dark、最小 28px | ❌ 純文字「七日書」 | ❌ 純文字「七日書合作」 | ❌ 純文字「七日書博物館」 |
| Logo 應放角落不放中央 | [layout-principles.md §6](../docs/freewrite-design-system/layout-principles.md) | ⚠️ 在 sitebar 左側（角落 OK），但元件不對 | 同 | 同 |
| Display 字型 | jf-jinxuan Bold | ❌ Noto Serif TC | ❌ | ❌ |
| 4 個 freewrite token | 唯一允許範圍 | ✅ | ✅ | ✅ + `--museum-*` 局部 |
| 不放 brand 紫綠 | color-usage §限制 1 | ✅ | ✅ | ✅ |
| 插畫「手感 + 留白」 | [illustration-style.md §風格 do](../docs/freewrite-design-system/illustration-style.md) | 🟡 hero image 走 imagedelivery campaignCover 屬主視覺軌 OK；但其他 section 用純色卡片無紋理、無 scribble 裝飾，少了「手感」 | 同 | ✅ 24 archive cards 是純展示主視覺，留白做得夠 |
| 不要扁平向量插畫 | illustration §don't 1 | ✅ | ✅ ThemeIcon / LectureIcon 之前是這樣，已撤掉改 GrandBadge | ✅ |
| 不要 stock photo / 真實人臉 | illustration §don't 3 | ✅ | ✅ | ✅ |
| 繁中為母版 | [typography.md §繁簡規則](../docs/freewrite-design-system/typography.md) | ✅ 繁中（latestArticles 含一篇 IceYuzu 簡體文章內文，但卡片標題是「老白男」混排，符合「台灣母版」精神） | ✅ | ✅ |

---

## E. 優先順序（對齊 [component-index.md §對 landing 改版的優先順序](../docs/freewrite-design-system/component-index.md)）

DS 排序：`day-prompt-card > season-hero > participant-wall > logo > POAP > activity-banner > badge`

| # | 改動 | 優先級 | 涉及 sections | 引用條文 | 預估工作量 |
|---|---|---|---|---|---|
| **1** | **`day-prompt-card` 重做** | 🔴 **HIGH** | `/` `#current` 七天題目卡 | [day-prompt-card spec](../components/freewrite/day-prompt-card/spec.md) + [layout-principles.md §2 模板軌](../docs/freewrite-design-system/layout-principles.md) | 中 — 需引入 LINEAR_GRADIENT 背景、jf-jinxuan 主標題、logo 角標、加大字級到「每天打開一扇門」氣勢 |
| **2** | **載入 `jf-jinxuan` web font + 改 `--font-reading`** | 🔴 **HIGH** | 三頁所有 H1/H2/H3 | [typography.md §字型 + 載入](../docs/freewrite-design-system/typography.md) | 小 — `<link>` justfont CDN URL（站方已購授權）+ `base.css` token 改一行 |
| **3** | **七日書 logo SVG 替代純文字** | 🔴 **HIGH** | 三頁 sitebar + hero | [logo spec §Asset files](../components/freewrite/logo-seven-day-book/spec.md)；可從 `gh api repos/thematters/design-system/contents/brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/logo/seven-day-book-logo--dark.svg` 抓 | 小 — 新 component `<SevenDayBookLogo>` + 兩變體切換 |
| **4** | **新增 `participant-wall` section** | 🟡 **MEDIUM** | `/` `#stats` 之後或合併 | [participant-wall spec](../components/freewrite/participant-wall/spec.md) + [2025-summary MANIFEST §Comments Review](../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summary/MANIFEST.md) | 中 — 需從 latestArticles + 過去文章挑 12 條 quote / 12 個用戶名與頭像；4-children template |
| **5** | **新增 quote carousel + writers wall** | 🟡 **MEDIUM** | `/` `#articles` 之後加一段；`/` `#lectures` 之上加一段 | [seasonal-themes.md §2025 總結 8 段](../docs/freewrite-design-system/seasonal-themes.md)；候選 spec [component-index.md §未開 spec 1, 3](../docs/freewrite-design-system/component-index.md) | 中 — 從 latestArticles 抽 quote、從 lectures 抽 14 位作家頭像 grid |
| **6** | **Hero 改用 `season-hero` 元件結構** | 🟡 **MEDIUM** | 三頁 hero | [season-hero spec §Layout](../components/freewrite/season-hero/spec.md) | 小 — 結構已經接近，補上 logo SVG 角標 + season label TEXT 即可 |
| **7** | **`#articles` 卡片重命名為 `freewrite-feature-article-card`** | 🟢 **LOW** | `/` `/partners/` `#articles` | [layout-principles.md §4 編號分類](../docs/freewrite-design-system/layout-principles.md) | 小 — class 重命名 + 文件化 |
| **8** | **CTA band 對齊 activity-banner 精神** | 🟢 **LOW** | 三頁 CTA | [activity-banner spec](../components/freewrite/activity-banner/spec.md) | 小 |
| **9** | **博物館 `--museum-*` 局部 token 文件化** | 🟢 **LOW** | `/archive/` | [color-usage.md §批次 3](../docs/freewrite-design-system/color-usage.md) | 小 — 加 CSS 註解 + 在 base.css 標明這是局部 |
| **10** | **`#packages` 三圖示找 Figma 對應 icon** | 🟢 **LOW** | `/partners/` `#packages` | [component-index.md §Phase G 後續工作](../docs/freewrite-design-system/component-index.md) | — Figma 還沒出，目前 GrandBadge 暫代 OK |

---

## F. 不該動的 section（已對齊或刻意脫離）

- **`/archive/` 整頁** — 深色博物館風 user 決定保留
- **`#milestones`**（`/`）— 從 freewrite 帳號抽資料、結構乾淨
- **`#themes`** 兩頁（`/` 分頁、`/partners/` 列表）— 結構紮實
- **`#case`**（`/partners/`）— 兩廳院 case study 已有完整 gallery + relatedArticles
- **CSS 字重 400/500/600 範圍** — 已對齊 matters-ds 上限
- **Hero 動態 live line** 動畫 — 雖偏離 contemplative 調性，但 user 已要求做了；可在 #1-3 完成後再回頭微調

---

## G. 實作建議的 PR 拆法

每個 PR 一個 section（不要 mega-PR）：

1. **PR-1** `redesign(day-prompt-card): align with freewrite-design-system` — `/` `#current` 七張卡片重做（最大改動）
2. **PR-2** `redesign(typography): load jf-jinxuan via justfont CDN` — 三頁字型切換
3. **PR-3** `redesign(logo): replace text with SVG wordmark` — 三頁 sitebar + hero logo
4. **PR-4** `redesign(participant-wall): add 12-quote section` — `/` 新增評論牆
5. **PR-5** `redesign(season-hero): align hero structure to spec` — 三頁 hero 結構微調
6. **PR-6** `redesign(quote-writers-wall): add carousel + writers grid` — `/` 新增兩段

PR-1 + PR-2 + PR-3 是視覺對齊核心三步，建議先做。PR-4 開始進入「補新內容」階段，需要從 freewrite 帳號或 latestArticles 拉資料。

---

## H. 備註與假設

- **不引入 POAP 系統色 token**（`--color-freewrite-poap-{text,accent,highlight}`）— DS 仍在 Phase F，token 未落地，本次改版按 user 約束「不引入新 token」
- **不引入季節 accent token**（`--color-freewrite-season-*`）— 同上
- **博物館 accent `#69cdf0` 暫存為 `--museum-*` 局部，不上推到 freewrite token 系統**
- **AI 生圖 placeholder JPG 已棄用**（commit `527b565`），不在本次審計重啟
- **Figma 連結**：`https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id={nodeId}` — 各 spec 提及的 Figma node 可直接 deeplink

---

## I. 等你批註

請在以上 E 表（優先順序）批註你想先做的 1-3 項。我會針對每項做一個獨立 PR，含：

- 變更檔案清單與 diff 摘要
- 引用的 DS 條文（連結到 design-system repo 對應檔行號）
- before / after screenshots（live + 改後）
- 驗證指令（parser / dev server / live deploy）
