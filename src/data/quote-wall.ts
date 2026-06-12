// 由 scripts/fetch-quote-wall.mjs 自動產生，請勿手改。
// 來源：Matters 公開 GraphQL（各期七日書 WritingChallenge.quotes）。
//
// ⚠ 這是初始 placeholder（含 3 筆示意資料），讓頁面在階段 3 後端上線前
//   也能 build / review。階段 3 上線後跑 `node scripts/fetch-quote-wall.mjs --write`
//   會用真實資料覆蓋本檔。

export interface WallQuote {
  id: string;
  content: string;
  author: string;
  articleTitle: string;
  articleHash: string;
  campaignName: string;
  createdAt: string;
}

export const quoteWall: WallQuote[] = [
  {
    id: "sample-1",
    content: "無用之用，方為大用。",
    author: "sample_author",
    articleTitle: "第五天｜無用的午後",
    articleHash: "",
    campaignName: "七日書｜無用之用",
    createdAt: "2026-06-05T00:00:00.000Z",
  },
  {
    id: "sample-2",
    content: "有些時光，正因為無目的而珍貴。",
    author: "sample_author",
    articleTitle: "第三天",
    articleHash: "",
    campaignName: "七日書｜無用之用",
    createdAt: "2026-06-03T00:00:00.000Z",
  },
  {
    id: "sample-3",
    content: "離開不是結束，是把自己還給自己。",
    author: "sample_author",
    articleTitle: "第七天",
    articleHash: "",
    campaignName: "關於告別",
    createdAt: "2026-05-07T00:00:00.000Z",
  },
];

export const quoteWallCount = quoteWall.length;

// 牆上出現過的屆數（給篩選用）
export const quoteWallCampaigns: string[] = Array.from(
  new Set(quoteWall.map((q) => q.campaignName).filter(Boolean))
);
