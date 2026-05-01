// Matters 七日書 Landing data — 情感敘事版 (2026-04-24 rewrite)
// 所有 events / avatars / essays 取自 matters.town 公開頁面；numeric claims 來自 2026-01-05
// 官方總結與 2026-04 大滿貫公告，單期數字取近 3 期 SSR 實測。
// Note: Matters 資產 CDN = https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/{type}/{hash}/public

const CDN = "https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod";

export const sevenDayBookLanding = {
  // ── 頁面標題 ──────────────────────────────────────────────────────────
  title: "七天、七題，一萬人一起把生活寫成一本書。",
  description:
    "Matters 七日書是每月一次的常態書寫活動——七天、七個提示，上千位文友同時落筆。每一期是一本集體的小書，累計已寫下 9,000+ 篇、超過 800 萬字的人生。",
  tagline: "寫作不是孤單的事",

  // ── 聯絡 ─────────────────────────────────────────────────────────────
  contactHref:
    "mailto:ask@matters.town?subject=%E4%B8%83%E6%97%A5%E6%9B%B8%E5%90%88%E4%BD%9C%E6%B4%BD%E8%AB%87",

  // ── B2B landing compatibility fields ────────────────────────────────
  sourceNote:
    "以下數據整合 Matters 公開活動頁、官方總結與近期七日書完結報告，適合合作洽談時快速理解活動規模。",
  metrics: [
    {
      value: "9,000+",
      unit: "篇",
      label: "累計七日書作品",
      source: "2026-01 官方總結回顧",
    },
    {
      value: "800",
      unit: "萬字+",
      label: "累計書寫字數",
      source: "2026-01 官方總結回顧",
    },
    {
      value: "3,000+",
      unit: "人",
      label: "累計參與作者",
      source: "官方活動資料整理",
    },
    {
      value: "189",
      unit: "位",
      label: "大滿貫完成者",
      source: "2026-04 大滿貫公告",
    },
    {
      value: "12",
      unit: "期",
      label: "近一年主題活動",
      source: "公開活動頁整理",
    },
  ],
  primarySource: {
    label: "Matters 七日書官方總結回顧",
    href: "https://matters.town/a/u1510gz5by6o",
    date: "2026-04",
  },
  accountMetrics: [
    { value: "93", label: "已擷取官方文章", source: "公開帳號文章整理" },
    { value: "185", label: "已整理公開圖片", source: "活動頁與文章素材整理" },
    { value: "3009", label: "完結報告參與人次", source: "各期公開完結報告加總" },
    { value: "58%", label: "近四期完成率", source: "近期完結報告估算" },
  ],
  caveats: [
    "參與人次是活動期別加總，不等同於唯一作者數。",
    "完結報告與公告使用公開資料整理，正式提案前可再以營運後台校正。",
    "單期表現會隨主題、檔期與合作資源變動，建議以區間而非保證值溝通。",
  ],
  workflow: [
    {
      step: "01",
      title: "共創七道題目",
      body: "從合作方的公共議題、展演計畫或出版主題出發，轉譯成連續七天可書寫的提問。",
    },
    {
      step: "02",
      title: "七天同步書寫",
      body: "Matters 社群在同一週內回應同一組題目，形成可持續閱讀、分享與策展的作品流。",
    },
    {
      step: "03",
      title: "整理為公共檔案",
      body: "活動後可延伸完結報告、選集、講座、徽章或現場展示，讓內容沉澱為長期資產。",
    },
  ],
  themes: [
    {
      group: "記憶與感官",
      summary: "從氣味、物件、地方與衣櫥切入，讓私人記憶轉化成可共鳴的公共文本。",
      articles: [
        {
          title: "氣味博物館",
          href: "https://matters.town/e/aiafcgbu89p2",
          image: `${CDN}/campaignCover/fb1bd2c2-754d-493b-9750-352ef7fe27b7.png/public`,
        },
        {
          title: "衣櫥裡的自我",
          href: "https://matters.town/e/nqbeo3cdn585",
          image: `${CDN}/campaignCover/71c57cb5-aaf9-49a8-a530-3ef4a3a23a15.png/public`,
        },
      ],
    },
    {
      group: "生活與工作",
      summary: "把職場、帳本與日常交換寫成故事，適合品牌、出版與教育單位延伸策展。",
      articles: [
        {
          title: "我的人生帳本",
          href: "https://matters.town/e/q48dv6ve4g2m",
          image: `${CDN}/campaignCover/2e4aac3f-a9e3-4155-8a4e-7276420e3655.png/public`,
        },
        {
          title: "我的職場人格",
          href: "https://matters.town/e/wem6xy6u7okv",
          image: `${CDN}/campaignCover/b0246b96-bb14-4c82-af86-62fffbd9b14b.png/public`,
        },
      ],
    },
    {
      group: "身份與關係",
      summary: "透過家庭、告別、曖昧與雲端身份，打開跨世代與跨媒介的生命經驗。",
      articles: [
        {
          title: "數位雲端的我",
          href: "https://matters.town/e/4v5mndkbz44v",
          image: `${CDN}/campaignCover/96fd12ba-e46c-4316-9fe1-b5f13cf34b9f.png/public`,
        },
        {
          title: "說聲告別，走向新的自己",
          href: "https://matters.town/e/ox9fmcz6zxxj",
          image: `${CDN}/campaignCover/94525f57-eb5e-4e4a-9b5c-88af2ccb097f.png/public`,
        },
      ],
    },
  ],
  publicValues: [
    {
      title: "把分散作品變成共同記憶",
      body: "七日書讓同一週、同一題下的個人經驗彼此對照，形成比單篇文章更容易被策展與保存的集體文本。",
    },
    {
      title: "降低文化參與門檻",
      body: "不要求專業作者身份，只需要每天一題，讓文化機構與品牌能觸及已經願意書寫與回應的社群。",
    },
    {
      title: "讓活動留下可複用資產",
      body: "每期題目、作品、圖片、徽章與報告都能延伸成選集、展示、電子報、社群內容與長期資料庫。",
    },
    {
      title: "連接線上社群與實體場景",
      body: "七日書可搭配講座、展演、節慶與出版計畫，把線上作品帶回合作方的現場。",
    },
  ],
  keywords: ["書寫", "記憶", "社群", "策展", "出版", "講座", "徽章", "檔案", "公共議題"],
  caseStudy: {
    title: "兩廳院藝術出走 · 給自己的情書",
    summary:
      "2025 夏，Matters 與兩廳院「藝術出走」合作主題徵文「給自己的情書」，近 500 位文友書寫回應，成為該檔戶外節目的文字延伸。",
    facts: [
      "合作形式：主題徵文、作家講座、鏈上參與憑證",
      "活動規模：近 500 位參與者，串接線上書寫與實體節目",
      "延伸方式：可整理選集、現場展示與官方社群導流",
    ],
    href: "https://matters.town/@freewrite",
    image: `${CDN}/cover/1060a3d5-cbb9-4140-9b04-a0acb011449a.jpeg/public`,
  },
  packages: [
    {
      title: "主題共創",
      body: "為文化機構、基金會或品牌設計一組七日書題目，讓社群以連續七天回應同一公共議題。",
    },
    {
      title: "內容策展",
      body: "將作品整理成完結報告、選集、電子報或展場素材，讓活動成果可閱讀、可分享、可留存。",
    },
    {
      title: "講座與憑證",
      body: "搭配作家講座、完成徽章與 Writing Passport，強化參與者的完成感與長期連結。",
    },
  ],
  tagLinks: [
    {
      label: "七日書",
      count: "長期標籤",
      href: "https://matters.town/tags/167821-%E4%B8%83%E6%97%A5%E6%9B%B8",
    },
    {
      label: "自由寫",
      count: "官方帳號",
      href: "https://matters.town/@freewrite",
    },
    {
      label: "活動頁",
      count: "近期主題",
      href: "https://matters.town/events?type=ended",
    },
  ],

  // ── Hero / 首屏 ───────────────────────────────────────────────────────
  hero: {
    eyebrow: "Matters · 每月一本",
    kicker: "Seven Days, Seven Prompts.",
    headlineTop: "七日書",
    headline: "一座每個月都\n重新長出來的小鎮。",
    subheadline:
      "你不是一個人在寫。每月初，上千位文友會在同一個七天裡，寫同一份題目——各自走進各自的記憶，卻在同一條街上相遇。",
    primaryCta: { label: "看最新一期作品", href: "https://matters.town/e/aiafcgbu89p2" },
    secondaryCta: { label: "加入下一期", href: "https://matters.town/@freewrite" },
    // 自由寫 primary image — 直接用 Matters Cloudflare images 的尺寸/動畫參數以避免過大
    heroCover: `${CDN}/campaignCover/b0246b96-bb14-4c82-af86-62fffbd9b14b.png/w=1920,h=1080,fit=cover,anim=false`,
  },

  // ── Gallery — 從本次擷取的 185 張素材中選用 12 張 embed 畫面 ─────────────
  gallery: {
    kicker: "Visual memory",
    headline: "九千篇作品裡，這些畫面從不同的七日裡浮出來。",
    body: "作者們上傳的插畫、紀錄、手寫筆記——這是 Matters 七日書的視覺檔案。點擊可回到原文。",
    images: [
      { src: `${CDN}/embed/ed23993d-d395-47b5-9110-d9caec4ea4ba.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 01" },
      { src: `${CDN}/embed/93f52a64-cc21-402e-bc5e-64190fddc483.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 02" },
      { src: `${CDN}/embed/5a00411a-5ca3-4751-8d36-c8be49f35e8c.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 03" },
      { src: `${CDN}/embed/bf0063ed-71fd-45e9-a6f5-2d994207e338.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 04" },
      { src: `${CDN}/embed/6fd927a4-b33d-4b38-bf70-2183d03efe77.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 05" },
      { src: `${CDN}/embed/716afd71-ac86-4344-a08d-734f1f0e6a42.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 06" },
      { src: `${CDN}/embed/9e5ab949-a2ae-47fd-b2a9-66620f1bf4ab.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 07" },
      { src: `${CDN}/embed/c57145db-a56c-4cd0-8807-7baa273b6a32.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 08" },
      { src: `${CDN}/embed/c135b52b-181b-43ef-a51d-2ea1e6e7ed34.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 09" },
      { src: `${CDN}/embed/996cbf83-1dfb-43e4-be64-b17232fac234.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 10" },
      { src: `${CDN}/embed/1e247419-c16c-420a-8a4d-f90d93fcbc49.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 11" },
      { src: `${CDN}/embed/aa768913-937f-4143-8da9-2fd1c37e5560.png/w=600,h=600,fit=cover`, alt: "七日書畫面摘錄 12" },
    ],
  },

  // ── Pulse / 現在有多少人正在寫 ─────────────────────────────────────────
  pulse: {
    kicker: "Now writing",
    headline: "280+ 位文友走完了四期，189 位拿到大滿貫。",
    body: "每期有 90–120 位在七天裡交出七篇；累計超過 3,000 位作者、9,000+ 篇文章、800 萬字。下面是最近出現的面孔。",
    stats: [
      { value: "280+", label: "近四期走完至少一期" },
      { value: "189", label: "大滿貫（完成 7/7）" },
      { value: "3,000+", label: "累計參與作者" },
      { value: "9,000+", label: "累計作品篇數" },
    ],
    source: {
      label: "數字來源：2026-04 大滿貫公告 / 2026-01 官方總結回顧",
      href: "https://matters.town/a/u1510gz5by6o",
    },
  },

  // ── Seven-day cadence (抽象版 — 每期題目不同，這裡呈現「七天的形狀」)──
  cadence: {
    kicker: "七天的形狀",
    headline: "七題一本小書，從一個字開始，到一個未來結束。",
    body: "每一期的題目不同，但七天的弧線相似——從當下出發，走進記憶，遇見他人，回到自己。",
    days: [
      { n: 1, kw: "啟程", prompt: "第一個念頭落下的地方。" },
      { n: 2, kw: "物件", prompt: "身邊那件最舊的東西。" },
      { n: 3, kw: "他人", prompt: "一個你沒有再見的人。" },
      { n: 4, kw: "味道", prompt: "一個被封存的氣味。" },
      { n: 5, kw: "帳本", prompt: "生活裡一次算不清的交換。" },
      { n: 6, kw: "沉默", prompt: "你不想說出口的那件事。" },
      { n: 7, kw: "來日", prompt: "下一個七天，你打算？" },
    ],
  },

  // ── Events timeline — 12 期真實活動 (2025-04 → 2026-05) ─────────────
  // 覆蓋近一年整整 12 期；更早期別請見 matters.town/events?type=ended
  events: [
    {
      season: "2026-05",
      name: "我的職場人格",
      phase: "即將開始",
      writingWindow: "5/4 – 5/11",
      cover: `${CDN}/campaignCover/b0246b96-bb14-4c82-af86-62fffbd9b14b.png/public`,
      href: "https://matters.town/e/wem6xy6u7okv",
      description: "勞動節前夕，書寫職場中那個會疲累、會渴望被理解的自己。",
    },
    {
      season: "2026-04",
      name: "氣味博物館",
      phase: "進行中",
      writingWindow: "4/6 – 4/13",
      cover: `${CDN}/campaignCover/fb1bd2c2-754d-493b-9750-352ef7fe27b7.png/public`,
      href: "https://matters.town/e/aiafcgbu89p2",
      description: "感官與記憶之旅，寫下那些封存已久、忽然被喚起的氣與味。",
    },
    {
      season: "2026-03",
      name: "我的人生帳本",
      phase: "完結",
      participants: 101,
      newcomers: 27,
      writingWindow: "3/2 – 3/9",
      cover: `${CDN}/campaignCover/2e4aac3f-a9e3-4155-8a4e-7276420e3655.png/public`,
      href: "https://matters.town/e/q48dv6ve4g2m",
      description: "把人生寫成一張帳本，記下所有算得清與算不清的。",
    },
    {
      season: "2026-02",
      name: "數位雲端的我",
      phase: "完結",
      participants: 116,
      newcomers: 37,
      writingWindow: "2/2 – 2/9",
      cover: `${CDN}/campaignCover/96fd12ba-e46c-4316-9fe1-b5f13cf34b9f.png/public`,
      href: "https://matters.town/e/4v5mndkbz44v",
      description: "雲端裡那個一直被搜尋、被儲存、被遺忘的你。",
    },
    {
      season: "2026-01",
      name: "衣櫥裡的自我",
      phase: "完結",
      participants: 93,
      newcomers: 35,
      writingWindow: "1/5 – 1/12",
      cover: `${CDN}/campaignCover/71c57cb5-aaf9-49a8-a530-3ef4a3a23a15.png/public`,
      href: "https://matters.town/e/nqbeo3cdn585",
      description: "從一件衣服寫起，打開了一整個衣櫃的自己。",
    },
    {
      season: "2025-12",
      name: "說聲告別，走向新的自己",
      phase: "完結",
      writingWindow: "12/1 – 12/8",
      cover: `${CDN}/campaignCover/94525f57-eb5e-4e4a-9b5c-88af2ccb097f.png/public`,
      href: "https://matters.town/e/ox9fmcz6zxxj",
      description: "在年末，一場向過去的整理告別。",
    },
    {
      season: "2025-11",
      name: "重構生活",
      phase: "完結",
      writingWindow: "11/3 – 11/10",
      cover: `${CDN}/campaignCover/98d56bea-4411-481f-947b-195438bae79c.png/public`,
      href: "https://matters.town/e/3uskpxsbzmz5",
      description: "當生活需要被重新搭一次，從哪一塊磚開始？",
    },
    {
      season: "2025-10",
      name: "曖昧時刻",
      phase: "完結",
      writingWindow: "10/6 – 10/13",
      cover: `${CDN}/campaignCover/786b897f-c82d-4d4c-b92b-d20a75fe1218.png/public`,
      href: "https://matters.town/e/owt3jxplay6z",
      description: "那些說不清、但你知道發生了什麼的時刻。",
    },
    {
      season: "2025-06",
      name: "What If 人生有如果",
      phase: "完結",
      writingWindow: "6/1 – 6/8",
      cover: `${CDN}/cover/852dac20-0110-4109-8ba3-7e714aadb13a.png/public`,
      href: "https://matters.town/a/yxa1gen0z7jd",
      description: "給另一個版本的自己——如果當時選了別條路。",
    },
    {
      season: "2025-05",
      name: "人生的靈魂提問",
      phase: "完結",
      writingWindow: "5/5 – 5/12",
      cover: `${CDN}/cover/de381255-e0e9-44c5-932b-11360d2f8a0e.png/public`,
      href: "https://matters.town/a/qqde3qpnmf7i",
      description: "自由寫一週年特輯，書寫七個持續追問的人生題。",
    },
    {
      season: "2025-04",
      name: "書寫地方",
      phase: "完結",
      writingWindow: "4/1 – 4/8",
      cover: `${CDN}/embed/90d95b03-e273-4f6b-b4df-a93cc0ee5850.png/public`,
      href: "https://matters.town/a/24a9mapb7gqt",
      description: "寫一個你住過的地方——街角、店、或一次短暫的停留。",
    },
    {
      season: "2025-03",
      name: "我的家庭故事",
      phase: "完結",
      writingWindow: "3/2 – 3/9",
      cover: `${CDN}/cover/3691f81a-0f0c-42b9-9de6-e27308cdd47f.png/public`,
      href: "https://matters.town/a/4t8r4oe22a7m",
      description: "一家人之間說不出口，卻仍然發生過的那些事。",
    },
  ],

  // ── Voices — 真實文章節錄 ────────────────────────────────────────────
  voices: [
    {
      season: "氣味博物館 · 2026-04",
      dayLabel: "DAY 01",
      author: "司陶",
      handle: "@xiaomaomigigi",
      title: "是日短箋1｜聞香識貴妃",
      excerpt: "楊貴妃，聞起來竟是寒涼的。",
      href: "https://matters.town/a/dfm4rghx8v2j",
      avatar: `${CDN}/avatar/99e44d7b-052d-45dc-ae9b-a7bc24c650a8.jpeg/public`,
    },
    {
      season: "氣味博物館 · 2026-04",
      dayLabel: "DAY 06",
      author: "Jules Vela",
      handle: "@jules_vela",
      title: "第六天 · 記一種味道或氣味",
      excerpt: "我以為是不一樣的，但接觸越多，越發現相似度很高，只是版本不同。就像一個牢籠——我以為我逃出來了。",
      href: "https://matters.town/a/m5sim1qruk8z",
      avatar: `${CDN}/avatar/1fa50bea-4bbc-4211-8cf3-772ec5394232.jpeg/public`,
    },
    {
      season: "人生帳本 · 2026-03",
      dayLabel: "DAY 04",
      author: "內角和",
      handle: "@neijiaohe",
      title: "刀口的名字是路易威登",
      excerpt: "座位上獨坐的那只名牌小包，我盯著它，它也盯著我。原來錢確實是得花在刀口上的。",
      href: "https://matters.town/a/t0u1jkn8bxup",
      avatar: `${CDN}/avatar/f2e7eee2-b24c-450e-b5e9-3f3ecdd906c5.jpeg/public`,
    },
    {
      season: "人生帳本 · 2026-03",
      dayLabel: "DAY 03",
      author: "裕美抹茶",
      handle: "@yumimatcha",
      title: "即使友情價也得不到的東西",
      excerpt: "有一點衝動，有一點怕被別人看不起，似乎還有一點有了這樣的交情好像可以更靠近另一個我平常碰不太到的世界。",
      href: "https://matters.town/a/nqqchsjynfxz",
      avatar: `${CDN}/avatar/d930d2f8-3360-46e0-8e29-e9a1b72314e3.jpeg/public`,
    },
    {
      season: "數位雲端的我 · 2026-02",
      dayLabel: "DAY 05",
      author: "锡德不在此",
      handle: "@heresydcomes",
      title: "想念是一件很私人的事情",
      excerpt: "其實是不需要分享的，抑或是，需要去稀釋的——把微觀的情感放到宏觀的場域裡，沖刷其濃度。",
      href: "https://matters.town/a/92s72cfbljrz",
      avatar: `${CDN}/avatar/f2e7eee2-b24c-450e-b5e9-3f3ecdd906c5.jpeg/public`,
    },
    {
      season: "人生帳本 · 2026-03",
      dayLabel: "DAY 07",
      author: "'' 空瓦",
      handle: "@katodot",
      title: "你，是你，獨一的你",
      excerpt: "我其實不想跟你們玩一樣的遊戲。",
      href: "https://matters.town/a/hj2s5oud68n2",
      avatar: `${CDN}/avatar/f769da76-d0ba-429a-b854-15a459695ff8.jpeg/public`,
    },
  ],

  // ── Avatars — 30 位真實參與者（取自 4 期事件頁） ───────────────────────
  avatarWall: [
    { handle: "xiaomaomigigi", name: "司陶", src: `${CDN}/avatar/99e44d7b-052d-45dc-ae9b-a7bc24c650a8.jpeg/public` },
    { handle: "yuuuuu_cc", name: "俞木瑜", src: `${CDN}/avatar/1fa50bea-4bbc-4211-8cf3-772ec5394232.jpeg/public` },
    { handle: "yumimatcha", name: "裕美抹茶", src: `${CDN}/avatar/d930d2f8-3360-46e0-8e29-e9a1b72314e3.jpeg/public` },
    { handle: "nomatterwhat123", name: "K的一生", src: `${CDN}/avatar/ea91fbd6-717b-4b3f-b138-97d50b13653f.jpeg/public` },
    { handle: "potions_17", name: "野貓", src: `${CDN}/avatar/5e65ffc9-237e-4618-b320-90225ddd9121.png/public` },
    { handle: "katodot", name: "'' 空瓦", src: `${CDN}/avatar/f769da76-d0ba-429a-b854-15a459695ff8.jpeg/public` },
    { handle: "heresydcomes", name: "锡德不在此", src: `${CDN}/avatar/f2e7eee2-b24c-450e-b5e9-3f3ecdd906c5.jpeg/public` },
    { handle: "inmyewigkeit", name: "inmyewigkeit", src: `${CDN}/avatar/8de197d2-ae74-4a53-a162-7df89bd908d3.jpeg/public` },
    { handle: "moe645184", name: "Chechin", src: `${CDN}/avatar/768fe48a-edb9-40d4-8496-74d725079ea3.jpeg/public` },
    { handle: "rrjw0902", name: "攝氏衛生", src: `${CDN}/avatar/00b8913c-61bb-459c-8cff-1f53aee11ab0.jpeg/public` },
    { handle: "histeria", name: "小樹", src: `${CDN}/avatar/2fe83d99-0843-4884-95b4-8917220f3597.jpeg/public` },
    { handle: "thermometer", name: "Thermometer", src: `${CDN}/avatar/7e640fc4-8c2a-4602-9791-cba955c87c37.jpeg/public` },
    { handle: "eatandsheet", name: "eatandsheet", src: `${CDN}/avatar/fb48d335-892a-4854-bfd1-6ecbaf04059b.jpeg/public` },
    { handle: "some_any_nothin", name: "小隱於野", src: `${CDN}/avatar/bf2f8559-6215-4ea0-984e-c2e64df07af8.jpeg/public` },
    { handle: "hana2002", name: "Hana", src: `${CDN}/avatar/40b3cfb2-15eb-44d6-82cc-e9ba993fe5d8.png/public` },
    { handle: "paperplanedown", name: "零号样本", src: `${CDN}/avatar/3adefcf6-6c56-46ce-bf6b-204134986d82.jpeg/public` },
    { handle: "charlesmungerai", name: "窮查理．蒙哥", src: `${CDN}/avatar/e5b8d49a-e0e2-40a4-a517-07f39f0c9de1.png/public` },
    { handle: "belivelyyy", name: "Belive", src: `${CDN}/avatar/4f805927-f74f-4b39-8a5e-a6f40198e7e3.jpeg/public` },
    { handle: "Jyuan1023", name: "YuAn", src: `${CDN}/avatar/1f2fc00f-8aaf-4e59-9c0a-137e11c25415.jpeg/public` },
    { handle: "leeannetour", name: "Anne", src: `${CDN}/avatar/233c2fca-f34c-48d6-8cdf-2ccc2579a5d1.jpeg/public` },
    { handle: "westbamboo", name: "竹西", src: `${CDN}/avatar/b296e669-5929-41b4-a3ff-9a5585123839.jpeg/public` },
    { handle: "Denji_333", name: "飛非", src: `${CDN}/avatar/5ff0ac6b-fba8-430e-8422-3660358870af.jpeg/public` },
    { handle: "linnea", name: "Linnea", src: `${CDN}/avatar/dbbbf9d9-f41f-4c1e-b489-80fe45b5b7ed.png/public` },
    { handle: "iforissac", name: "鯨魚男孩", src: `${CDN}/avatar/aa42ea23-8d10-47c9-90cd-d6900cddf600.jpeg/public` },
    { handle: "katetukt", name: "凱特的故事沙龍", src: `${CDN}/avatar/6e8f05c0-cce6-474a-96c9-585c3dcce8f6.jpeg/public` },
    { handle: "ingotw", name: "因田木", src: `${CDN}/avatar/36f9d854-6168-46ee-afad-9f3a96f41cd7.jpeg/public` },
    { handle: "ningning", name: "yunlu6", src: `${CDN}/avatar/16c788c6-2b4f-4882-bec8-fe76f2f9e81d.jpeg/public` },
    { handle: "yomi", name: "yomi", src: `${CDN}/avatar/8f4c4b94-fdde-4c50-ad89-0c06f70ed790.jpeg/public` },
    { handle: "ecrire", name: "岱兮", src: `${CDN}/avatar/c65d5bd2-a0f3-40fd-abe1-3d7d4807b8b1.jpeg/public` },
  ],

  // ── Badge / Passport — 大滿貫鏈上憑證 ──────────────────────────────────
  passport: {
    kicker: "Seven-for-seven 大滿貫",
    headline: "七天寫滿，拿到屬於你的鏈上憑證。",
    body: "完成七篇就是大滿貫——至今已有 189 位文友拿到這張鏈上參與憑證（Writing Passport）。它不是炫耀，是一頁寫給自己的時間印章。",
    image: `${CDN}/embed/fb68ce5a-4651-49b1-8cbc-3c08a47ed973.jpeg/public`,
    imageAlt: "四期七日書大滿貫長條證書，列有 103+ 位完成者名單",
    link: {
      label: "看大滿貫名單與徽章公告",
      href: "https://matters.town/a/u1510gz5by6o",
    },
  },

  // ── Partners (B2B 合作 — 下放到次層) ────────────────────────────────
  partners: {
    kicker: "For cultural partners",
    headline: "一起設計下一個，能被上千人持續書寫的題目。",
    body: "適合文化機構、基金會、出版品牌、教育單位與希望支持公共書寫的企業。",
    caseStudy: {
      title: "兩廳院藝術出走 · 給自己的情書",
      summary: "2025 夏，Matters 與兩廳院「藝術出走」合作主題徵文「給自己的情書」，近 500 位文友書寫回應，成為該檔戶外節目的文字延伸。",
      facts: [
        "合作形式：主題徵文 × 作家講座 × 鏈上參與憑證",
        "規模：近 500 位參與、跨三週線上 + 實體",
        "延伸：選集匯編至活動現場陳列、導流官方社群",
      ],
      href: "https://matters.town/@freewrite",
      image: `${CDN}/cover/1060a3d5-cbb9-4140-9b04-a0acb011449a.jpeg/public`,
    },
    packages: [
      {
        title: "主題共創",
        body: "從你的命題出發，共同設計七道題目，由七日書社群在七天內回應。",
      },
      {
        title: "作家講座",
        body: "搭配徵文舉辦線上 / 實體講座，邀請活動作家與參與者對話。",
      },
      {
        title: "鏈上憑證",
        body: "七天完成者可獲得大滿貫 Writing Passport，作為品牌與讀者的長期連結。",
      },
    ],
  },

  // ── FAQ ──────────────────────────────────────────────────────────────
  faq: [
    {
      q: "我可以中途加入嗎？",
      a: "可以。進度從你加入那天算起，但我們鼓勵補寫前幾天——七天的順序其實是一條心情的曲線。",
    },
    {
      q: "沒寫完會怎樣？",
      a: "沒寫完一樣可以把已寫的篇章收進本季選集，只是不會拿到大滿貫憑證。近四期完成率約 58%——所以能寫到第三天已經超過一半。",
    },
    {
      q: "其他人看得到我寫的嗎？",
      a: "預設公開（跟平常發表一樣）。如果想先寫草稿，儲存在草稿區，不會進入公開選集。",
    },
    {
      q: "下一期什麼時候？",
      a: "每月一期，通常月初報名、月中書寫。站內與 email 會領前兩週通知下一期主題。",
    },
    {
      q: "品牌方可以怎麼參與？",
      a: "我們與文化機構共創主題與活動——從題目設計、作家講座到鏈上憑證的完整流程。點最下方「洽談合作」聊聊。",
    },
  ],

  // ── Closing ─────────────────────────────────────────────────────────
  closing: {
    headline: "下一個七天，一起寫。",
    body: "給當時的自己，也給某個你可能還沒想到的讀者。",
    primaryCta: { label: "加入下一期", href: "https://matters.town/@freewrite" },
    secondaryCta: { label: "洽談合作", href: "#contact" },
  },
};

export type SevenDayBookLanding = typeof sevenDayBookLanding;
