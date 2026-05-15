# Free Writing 徽章——拆解與重生計畫

> 走方案 B：盡可能還原 layer，剩下的底紋用 gpt-image-2 重生。

## 目錄結構

```
public/images/freewrite/badges/
├── source/                    # 原始素材（請使用者上傳）
│   ├── Free Writing_參加獎.png
│   ├── Free Writing_大滿貫.png
│   └── base/                  # 沒疊日期的乾淨底（如果有）
│       ├── 參加獎_底圖.png
│       └── 大滿貫_底圖.png
├── layers/                    # 拆出來的 SVG / PNG layer
│   ├── frame-bg.png           # AI 生成的底紋（gpt-image-2 輸出）
│   ├── ribbon.svg             # 紅色緞帶
│   ├── stamp-參加獎.svg
│   ├── stamp-大滿貫.svg
│   ├── title-七日書.svg       # 毛筆字「七日書」
│   ├── decoration-dots.svg    # 裝飾點點
│   └── decoration-lines.svg   # 裝飾線
└── composed/                  # 動態組裝後的成品（runtime）
    └── (由 BadgeCanvas.astro 即時 render)
```

## Layer 拆解策略

### 可以從 Figma 直接 export 的（保真度最高）
- 「七日書」毛筆字 → SVG path
- 「參加獎」/「大滿貫」印章字 → SVG path
- 緞帶 → SVG shape + gradient
- 裝飾點點 → SVG circles
- 裝飾線 → SVG paths
- 日期文字框 → 動態文字（CSS / Canvas）

### 需要 AI 重生的
- 底紋紙質 / 邊框質感 / 裝飾性的水彩潑色
- 任何「手繪一次性」的紋理

---

## gpt-image-2 風格 prompt 草案

> 用於生成新主題（不同活動）的底圖。中文字、印章、緞帶都會用 SVG 蓋上去，所以這個 prompt **只要底紋與整體配色**。

```
A square commemorative badge background, hand-illustrated style, warm
ivory paper texture with subtle aged grain. Soft watercolor washes in
muted earth tones — terracotta, sage, dusty gold — bleeding gently into
the paper. Minimal organic decorative marks at the edges (small ink
dots, thin brush strokes), but center is left mostly empty for overlay
text. No actual letters, no Chinese characters, no people, no logos.
Subtle vignette darker at corners. Style references: 1960s Japanese
literary magazine cover, woodblock print restraint. 4096×4096, square,
flat 2D, no 3D shading.
```

**主題變化**（不同活動套不同色系）：
- 春之七日書 → 嫩綠 + 櫻粉
- 夏之七日書 → 海藍 + 鵝黃
- 秋之七日書 → 楓紅 + 土金（接近原版）
- 冬之七日書 → 雪白 + 靛青

---

## 渲染管線（runtime）

```
<BadgeCanvas
  type="參加獎"           // 決定印章
  theme="autumn"          // 決定 frame-bg 哪一張
  date="2024.03.15"       // 動態文字
  size={400}              // 顯示尺寸
/>
```

內部 SVG 結構：
```xml
<svg viewBox="0 0 4096 4096">
  <image href="frame-bg-autumn.png" />     <!-- AI 底 -->
  <use href="#decoration-dots" />          <!-- SVG 裝飾 -->
  <use href="#decoration-lines" />
  <use href="#title-七日書" />
  <use href="#ribbon" />
  <use href="#stamp-參加獎" />
  <text class="badge-date">2024.03.15</text>  <!-- 動態 -->
</svg>
```

優點：
- 中文字、印章永遠 pixel-perfect（向量）
- 換主題只換一張底圖 PNG
- 換日期只換一個 `<text>` 內容
- museum 顯示時可以 CSS animate 整個 SVG（旋轉緞帶、淡入印章…）
