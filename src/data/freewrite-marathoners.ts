// 七日書馬拉松選手 — ground truth from observablehq notebook (2026-05-19)
// Source: https://observablehq.com/d/3959b9c8a57f4bb9 (Event - 七日書大滿貫)
// notebook 直連 Matters prod replica DB 計算，比 public GraphQL 完整
// （GraphQL 不會列出被隱藏 / 撤回的文章；observablehq 看得到 audit_log）
// 重新匯出流程：observablehq history table → Export as JSON →
// 蓋掉 research/freewrite-grand-slams-observablehq.json →
// node scripts/import-grand-slams.mjs --write

export interface Marathoner {
  userName: string;          // Matters handle (e.g. "boxuan0531")
  displayName: string;       // user-facing name
  avatar: string | null;
  grandSlams: number;        // 累計拿到大滿貫的期數
  grandSlamCampaigns: string[]; // 那幾期 campaign shortHash（早期 1-4 用 "#1"-"#4"）
  /** 至少投稿的文章數（每次大滿貫 = 7 篇下限；三日書期數 = 3 篇下限，估算偏保守） */
  totalArticles: number;
  /** 至少參與過的期數（等於 grandSlams，因為這只列大滿貫者） */
  campaignsParticipated: number;
}

export const totalGrandSlams = 951;
export const totalUniqueGrandSlamWinners = 464;
export const eventCount = 25;

/** 各期大滿貫人數（按期數遞增）*/
export const perCampaignGrandSlams = [
  { campaign:  1, count: 78 },
  { campaign:  2, count: 72 },
  { campaign:  3, count: 60 },
  { campaign:  4, count: 68 },
  { campaign:  5, count: 57 },
  { campaign:  6, count: 14 },
  { campaign:  7, count: 47 },
  { campaign:  8, count: 35 },
  { campaign:  9, count: 44 },
  { campaign: 10, count: 30 },
  { campaign: 11, count: 31 },
  { campaign: 12, count: 26 },
  { campaign: 13, count: 46 },
  { campaign: 14, count: 41 },
  { campaign: 15, count: 25 },
  { campaign: 16, count: 54 },
  { campaign: 17, count: 41 },
  { campaign: 18, count: 18 },
  { campaign: 19, count: 29 },
  { campaign: 20, count: 23 },
  { campaign: 21, count: 17 },
  { campaign: 22, count: 35 },
  { campaign: 23, count: 22 },
  { campaign: 24, count: 19 },
  { campaign: 25, count: 19 },
];

/** Top 50 marathoners by 累計大滿貫次數 */
export const marathoners: Marathoner[] = [
  { userName: "jingthereforeim", displayName: "KJOH", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/9131eb1a-ac6a-474d-94bf-3587f2cc36f0.jpeg/public", grandSlams: 21, grandSlamCampaigns: ["#4","26uhbm3uh6rg","3uskpxsbzmz5","4nqnizsygmcn","5zhf2bpty274","8t5liudbtpup","aiafcgbu89p2","efkk0l9hcg96","eqsfuc3qph6u","f7rpyecg32mg","h2ya9xxjubd2","ia800figcq9y","nqbeo3cdn585","owt3jxplay6z","ox9fmcz6zxxj","q48dv6ve4g2m","rt04oolqbexh","scx3f16y37v6","wem6xy6u7okv","x4rv6dwgk68o","ybs0lqsrpmhn"], totalArticles: 127, campaignsParticipated: 21 },
  { userName: "jerryku2003", displayName: "JK_talk", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/25ab67ca-201a-415e-b6b6-9110034f0b64.jpeg/public", grandSlams: 20, grandSlamCampaigns: ["#1","#2","#3","#4","3uskpxsbzmz5","4nqnizsygmcn","4v5mndkbz44v","5zhf2bpty274","efkk0l9hcg96","eqsfuc3qph6u","f7rpyecg32mg","h2ya9xxjubd2","ia800figcq9y","nqbeo3cdn585","q48dv6ve4g2m","rt04oolqbexh","scx3f16y37v6","wem6xy6u7okv","x4rv6dwgk68o","ybs0lqsrpmhn"], totalArticles: 120, campaignsParticipated: 20 },
  { userName: "qianfluentleap", displayName: "Moonleap", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/dba0352e-73b1-4254-ba8e-b6b314d9d608.png/public", grandSlams: 20, grandSlamCampaigns: ["#1","#2","#3","#4","3uskpxsbzmz5","4v5mndkbz44v","5zhf2bpty274","8t5liudbtpup","eqsfuc3qph6u","f7rpyecg32mg","h2ya9xxjubd2","ia800figcq9y","nqbeo3cdn585","owt3jxplay6z","ox9fmcz6zxxj","q48dv6ve4g2m","rt04oolqbexh","scx3f16y37v6","x4rv6dwgk68o","ybs0lqsrpmhn"], totalArticles: 124, campaignsParticipated: 20 },
  { userName: "klg50130", displayName: "大風", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/17250908-4968-4ba0-b367-1f0a5f680077.jpeg/public", grandSlams: 15, grandSlamCampaigns: ["#1","#2","#3","#4","26uhbm3uh6rg","4nqnizsygmcn","8t5liudbtpup","efkk0l9hcg96","eqsfuc3qph6u","f7rpyecg32mg","h2ya9xxjubd2","ia800figcq9y","scx3f16y37v6","x4rv6dwgk68o","ybs0lqsrpmhn"], totalArticles: 93, campaignsParticipated: 15 },
  { userName: "Benno", displayName: "Benno", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/3e30f88d-4436-4681-ac59-eebbcef3c282.jpeg/public", grandSlams: 13, grandSlamCampaigns: ["#1","#2","#4","26uhbm3uh6rg","4nqnizsygmcn","4v5mndkbz44v","efkk0l9hcg96","f7rpyecg32mg","ia800figcq9y","nqbeo3cdn585","q48dv6ve4g2m","wem6xy6u7okv","ybs0lqsrpmhn"], totalArticles: 83, campaignsParticipated: 13 },
  { userName: "gaagwai", displayName: "賈瑰", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/2a79bcb4-5dc3-4c1c-9a27-c21e13e28767.jpeg/public", grandSlams: 13, grandSlamCampaigns: ["#1","#2","#4","26uhbm3uh6rg","4nqnizsygmcn","8t5liudbtpup","efkk0l9hcg96","eqsfuc3qph6u","ia800figcq9y","owt3jxplay6z","ox9fmcz6zxxj","scx3f16y37v6","x4rv6dwgk68o"], totalArticles: 87, campaignsParticipated: 13 },
  { userName: "leeannetour", displayName: "Anne", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/233c2fca-f34c-48d6-8cdf-2ccc2579a5d1.jpeg/public", grandSlams: 12, grandSlamCampaigns: ["26uhbm3uh6rg","3uskpxsbzmz5","4v5mndkbz44v","5zhf2bpty274","aiafcgbu89p2","eqsfuc3qph6u","h2ya9xxjubd2","ox9fmcz6zxxj","q48dv6ve4g2m","rt04oolqbexh","wem6xy6u7okv","x4rv6dwgk68o"], totalArticles: 72, campaignsParticipated: 12 },
  { userName: "andawnfrost", displayName: "考拉不渴", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/9f48aeef-4011-44b0-bedb-f9158dc589e4.jpeg/public", grandSlams: 10, grandSlamCampaigns: ["#1","#2","#3","#4","26uhbm3uh6rg","4v5mndkbz44v","8t5liudbtpup","efkk0l9hcg96","eqsfuc3qph6u","ia800figcq9y"], totalArticles: 66, campaignsParticipated: 10 },
  { userName: "boxuan0531", displayName: "陳伯軒", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/899ef0a6-9110-4c78-aaa9-fe86a0f04b6e.jpeg/public", grandSlams: 9, grandSlamCampaigns: ["#1","#2","#4","26uhbm3uh6rg","8t5liudbtpup","eqsfuc3qph6u","ia800figcq9y","scx3f16y37v6","x4rv6dwgk68o"], totalArticles: 63, campaignsParticipated: 9 },
  { userName: "klaviercindy", displayName: "YSC 。角落與世界 。", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/7eebba52-2c0b-40cb-8423-d56184a552f8.jpeg/public", grandSlams: 9, grandSlamCampaigns: ["#4","26uhbm3uh6rg","5zhf2bpty274","8t5liudbtpup","efkk0l9hcg96","eqsfuc3qph6u","ia800figcq9y","rt04oolqbexh","scx3f16y37v6"], totalArticles: 51, campaignsParticipated: 9 },
  { userName: "tetsugaku", displayName: "亂世裡的說書人", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/cf6ba5ff-7327-4467-ad6d-39e906c4d517.jpeg/public", grandSlams: 9, grandSlamCampaigns: ["26uhbm3uh6rg","4nqnizsygmcn","8t5liudbtpup","efkk0l9hcg96","eqsfuc3qph6u","f7rpyecg32mg","scx3f16y37v6","x4rv6dwgk68o","ybs0lqsrpmhn"], totalArticles: 55, campaignsParticipated: 9 },
  { userName: "qish", displayName: "為人而建", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/8cd9c401-d348-4859-9d42-91869e3ce54a.png/public", grandSlams: 8, grandSlamCampaigns: ["3uskpxsbzmz5","4v5mndkbz44v","5zhf2bpty274","h2ya9xxjubd2","nqbeo3cdn585","owt3jxplay6z","ox9fmcz6zxxj","rt04oolqbexh"], totalArticles: 44, campaignsParticipated: 8 },
  { userName: "winnie0828", displayName: "一隻會彈琴的貓", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/e05c1ff2-af48-48b8-89ea-62e67a091560.jpeg/public", grandSlams: 8, grandSlamCampaigns: ["#1","#3","26uhbm3uh6rg","4v5mndkbz44v","5zhf2bpty274","h2ya9xxjubd2","ia800figcq9y","scx3f16y37v6"], totalArticles: 48, campaignsParticipated: 8 },
  { userName: "freetothink_06", displayName: "Lior", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/09f76545-7dc2-4043-a0e0-eea2c1405d6b.png/public", grandSlams: 7, grandSlamCampaigns: ["3uskpxsbzmz5","4v5mndkbz44v","5zhf2bpty274","8t5liudbtpup","efkk0l9hcg96","ox9fmcz6zxxj","rt04oolqbexh"], totalArticles: 37, campaignsParticipated: 7 },
  { userName: "hahahappyqq", displayName: "Hsuan", avatar: null, grandSlams: 7, grandSlamCampaigns: ["#3","#4","f7rpyecg32mg","h2ya9xxjubd2","rt04oolqbexh","scx3f16y37v6","x4rv6dwgk68o"], totalArticles: 41, campaignsParticipated: 7 },
  { userName: "linnea", displayName: "Linnea", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/dbbbf9d9-f41f-4c1e-b489-80fe45b5b7ed.png/public", grandSlams: 7, grandSlamCampaigns: ["#4","26uhbm3uh6rg","4nqnizsygmcn","aiafcgbu89p2","efkk0l9hcg96","ia800figcq9y","ox9fmcz6zxxj"], totalArticles: 45, campaignsParticipated: 7 },
  { userName: "skytbl", displayName: "天藍", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/035c54f4-f0a1-41db-8c87-44077f085134.jpeg/public", grandSlams: 7, grandSlamCampaigns: ["#1","#3","#4","4v5mndkbz44v","ox9fmcz6zxxj","scx3f16y37v6","wem6xy6u7okv"], totalArticles: 49, campaignsParticipated: 7 },
  { userName: "voxmirror", displayName: "Tony_Chan", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/bdd22741-d5fe-4446-ab44-9b027688f236.png/public", grandSlams: 7, grandSlamCampaigns: ["4v5mndkbz44v","aiafcgbu89p2","nqbeo3cdn585","owt3jxplay6z","ox9fmcz6zxxj","rt04oolqbexh","wem6xy6u7okv"], totalArticles: 45, campaignsParticipated: 7 },
  { userName: "wordlingpress", displayName: "阿零", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/e4ecef5a-8f55-4519-9382-754110aa788e.png/public", grandSlams: 7, grandSlamCampaigns: ["3uskpxsbzmz5","4v5mndkbz44v","5zhf2bpty274","aiafcgbu89p2","owt3jxplay6z","ox9fmcz6zxxj","rt04oolqbexh"], totalArticles: 41, campaignsParticipated: 7 },
  { userName: "alyssandtige", displayName: "Alyssa 亞莉莎", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/5288ffda-8915-4667-94c1-4e53583fb5cb.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["26uhbm3uh6rg","4nqnizsygmcn","8t5liudbtpup","h2ya9xxjubd2","ia800figcq9y","scx3f16y37v6"], totalArticles: 38, campaignsParticipated: 6 },
  { userName: "ceres", displayName: "Ceres", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/8dc19286-53b9-46e0-b55a-6e015a17bd0b.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["#3","#4","eqsfuc3qph6u","ia800figcq9y","scx3f16y37v6","ybs0lqsrpmhn"], totalArticles: 38, campaignsParticipated: 6 },
  { userName: "chen0708", displayName: "si薰", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/9dbc77e4-b382-4eda-b443-3cf2904c6222.png/public", grandSlams: 6, grandSlamCampaigns: ["#1","#3","#4","5zhf2bpty274","ia800figcq9y","rt04oolqbexh"], totalArticles: 34, campaignsParticipated: 6 },
  { userName: "iceyuzu", displayName: "IceYuzu", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/d78220da-1d68-4f94-bf0c-87e0c6181a4f.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["#2","#3","#4","4nqnizsygmcn","8t5liudbtpup","eqsfuc3qph6u"], totalArticles: 42, campaignsParticipated: 6 },
  { userName: "jrandtime", displayName: "蘇禕Suy", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/457bc512-a308-4068-bfe9-113d9923dd26.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["4v5mndkbz44v","5zhf2bpty274","owt3jxplay6z","ox9fmcz6zxxj","rt04oolqbexh","wem6xy6u7okv"], totalArticles: 34, campaignsParticipated: 6 },
  { userName: "lewis81lewis", displayName: "Flora異想", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/4fb3fe30-c3b7-4ebe-8b49-7569e426c6f6.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["#1","#2","#3","#4","ia800figcq9y","scx3f16y37v6"], totalArticles: 42, campaignsParticipated: 6 },
  { userName: "rnwang54", displayName: "枯北", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/0abc943a-e1d3-4489-b50c-9b6adacbe4a3.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["#2","#3","#4","3uskpxsbzmz5","8t5liudbtpup","owt3jxplay6z"], totalArticles: 42, campaignsParticipated: 6 },
  { userName: "thermometer", displayName: "Thermometer ", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/7e640fc4-8c2a-4602-9791-cba955c87c37.jpeg/public", grandSlams: 6, grandSlamCampaigns: ["#1","#2","4v5mndkbz44v","8t5liudbtpup","eqsfuc3qph6u","f7rpyecg32mg"], totalArticles: 42, campaignsParticipated: 6 },
  { userName: "012907_", displayName: "Sw", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/4c61d0c6-2d1b-4142-8cbb-e36c7a4acad6.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["4v5mndkbz44v","aiafcgbu89p2","ox9fmcz6zxxj","q48dv6ve4g2m","wem6xy6u7okv"], totalArticles: 35, campaignsParticipated: 5 },
  { userName: "594itsu", displayName: "已註銷用戶", avatar: null, grandSlams: 5, grandSlamCampaigns: ["4nqnizsygmcn","8t5liudbtpup","eqsfuc3qph6u","scx3f16y37v6","x4rv6dwgk68o"], totalArticles: 35, campaignsParticipated: 5 },
  { userName: "amelia1111", displayName: "彌雅Amelia", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/34cbb392-ac43-4893-86b0-666602c1b087.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["5zhf2bpty274","eqsfuc3qph6u","f7rpyecg32mg","rt04oolqbexh","x4rv6dwgk68o"], totalArticles: 27, campaignsParticipated: 5 },
  { userName: "Denji_333", displayName: "飛非", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/5ff0ac6b-fba8-430e-8422-3660358870af.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["5zhf2bpty274","aiafcgbu89p2","efkk0l9hcg96","q48dv6ve4g2m","wem6xy6u7okv"], totalArticles: 27, campaignsParticipated: 5 },
  { userName: "littleoldlady", displayName: "婆仔的心事", avatar: null, grandSlams: 5, grandSlamCampaigns: ["26uhbm3uh6rg","5zhf2bpty274","nqbeo3cdn585","rt04oolqbexh","wem6xy6u7okv"], totalArticles: 27, campaignsParticipated: 5 },
  { userName: "makotomoto", displayName: "選我正姐｜澈界", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/ce326bd4-2de9-4e0a-a293-6e42e7891245.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["4v5mndkbz44v","eqsfuc3qph6u","f7rpyecg32mg","nqbeo3cdn585","x4rv6dwgk68o"], totalArticles: 35, campaignsParticipated: 5 },
  { userName: "melodybird", displayName: "PassoetrY", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/d7a7690c-eb5e-4ea1-9092-d2fe4b26b1b6.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["4nqnizsygmcn","8t5liudbtpup","efkk0l9hcg96","eqsfuc3qph6u","x4rv6dwgk68o"], totalArticles: 31, campaignsParticipated: 5 },
  { userName: "molia", displayName: "molia", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/043dea96-0d6b-43e9-ac0a-7c7b90c313fd.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["#1","#2","eqsfuc3qph6u","ia800figcq9y","x4rv6dwgk68o"], totalArticles: 35, campaignsParticipated: 5 },
  { userName: "nosetalk", displayName: "鼻子說", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/1f7809d9-c4b6-40fe-ae83-ac0f059860af.jpeg/public", grandSlams: 5, grandSlamCampaigns: ["#3","26uhbm3uh6rg","efkk0l9hcg96","ia800figcq9y","scx3f16y37v6"], totalArticles: 31, campaignsParticipated: 5 },
  { userName: "tainl0810", displayName: "tainl0810", avatar: null, grandSlams: 5, grandSlamCampaigns: ["4v5mndkbz44v","aiafcgbu89p2","nqbeo3cdn585","q48dv6ve4g2m","wem6xy6u7okv"], totalArticles: 35, campaignsParticipated: 5 },
  { userName: "xvul3al", displayName: "xvul3al", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/e0f115f9-91a7-48ee-85ca-121c57d54ac8.png/public", grandSlams: 5, grandSlamCampaigns: ["3uskpxsbzmz5","5zhf2bpty274","h2ya9xxjubd2","owt3jxplay6z","rt04oolqbexh"], totalArticles: 23, campaignsParticipated: 5 },
  { userName: "aarynlee1026", displayName: "楚烨（Aaryn阿林）", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/14576add-e8c2-42c5-8f16-38173d0d120f.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#1","#3","8t5liudbtpup","ox9fmcz6zxxj"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "cafuna_eva", displayName: "Cafuna_eva", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/fec7c6f8-c871-4fa3-bb49-8593c13dba19.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#3","26uhbm3uh6rg","4nqnizsygmcn","ia800figcq9y"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "chinlunglin0831", displayName: "黎明之弧", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/0effabfd-8a41-4a48-bfab-ff6f6386b45a.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["4v5mndkbz44v","aiafcgbu89p2","q48dv6ve4g2m","wem6xy6u7okv"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "coalpp2020", displayName: "李炜", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/2a7ed553-f321-4030-bc3d-ca730d6a7839.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#3","#4","26uhbm3uh6rg","efkk0l9hcg96"], totalArticles: 24, campaignsParticipated: 4 },
  { userName: "damonlungs", displayName: "StarWanderer_DL", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/4ee02789-2bee-483e-a4e5-33fb5bde658c.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#3","#4","26uhbm3uh6rg","ybs0lqsrpmhn"], totalArticles: 24, campaignsParticipated: 4 },
  { userName: "hahachill", displayName: "栗子", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/c42c6ea8-246c-4201-add8-a126131f6f08.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#3","4v5mndkbz44v","q48dv6ve4g2m","x4rv6dwgk68o"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "icarus17", displayName: "小象", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/9df7221b-9f91-4c6b-a793-1f1abe56d231.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#1","#2","#4","ia800figcq9y"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "jadedchen", displayName: "jaded.chen", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/89f9a9df-ab1d-4517-a01f-8eb0dbf94997.png/public", grandSlams: 4, grandSlamCampaigns: ["3uskpxsbzmz5","5zhf2bpty274","owt3jxplay6z","rt04oolqbexh"], totalArticles: 20, campaignsParticipated: 4 },
  { userName: "jojoriya", displayName: "RiyaJoJo", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/e8217244-7932-49b9-b447-2598256148c8.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#2","#3","ia800figcq9y","ox9fmcz6zxxj"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "Jyuan1023", displayName: "YuAn", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/1f2fc00f-8aaf-4e59-9c0a-137e11c25415.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["#3","#4","26uhbm3uh6rg","aiafcgbu89p2"], totalArticles: 28, campaignsParticipated: 4 },
  { userName: "kasukonon", displayName: "海鹽青茶", avatar: null, grandSlams: 4, grandSlamCampaigns: ["#1","#2","#4","ybs0lqsrpmhn"], totalArticles: 24, campaignsParticipated: 4 },
  { userName: "katodot", displayName: "‘’ 空瓦", avatar: "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/f769da76-d0ba-429a-b854-15a459695ff8.jpeg/public", grandSlams: 4, grandSlamCampaigns: ["4v5mndkbz44v","nqbeo3cdn585","ox9fmcz6zxxj","rt04oolqbexh"], totalArticles: 24, campaignsParticipated: 4 },
];
