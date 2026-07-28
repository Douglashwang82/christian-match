# 「同心」基督徒深度交友平台 — 網站專案提案

> 專屬於基督徒的相親與深度交友平台。
> 核心理念：**教會、交友、認真、信主** —— 以信仰為根基的長遠關係，而非速食愛情。
>
> 視覺主軸：**極簡現代 (Minimalist Modern) + 液態玻璃擬態 (Liquid Glass)**，
> 配色為 **白 (主) / 銀 (輔) / 金 (點綴)**。

本提案分為四部分：
1. [資訊架構與流程 (Sitemap & Flow)](#一資訊架構與流程-sitemap--flow)
2. [UI/UX 設計細節](#二uiux-設計細節)
3. [前端技術選型建議](#三前端技術選型建議)
4. [核心頁面代碼框架](#四核心頁面代碼框架)

隨提案附上一個**可實際執行的 Next.js scaffold**，核心的「瀏覽 Match 卡片頁」已完整實作（見專案根目錄）。

---

## 一、資訊架構與流程 (Sitemap & Flow)

### 1.1 頁面層級 (Sitemap)

```
/                         首頁 Landing（理念、四步驟流程、CTA）
│
├── /register             ① 註冊（暱稱 / Email / 密碼）
├── /login                   登入
│
├── /onboarding              ── 首次引導流程（強制、線性）──
│   ├── /church           ② 教會歸屬填寫（可搜尋下拉選單，必填）
│   └── /survey           ③ 配對問卷（地區 + 靈命/生活習慣/交往步調）
│
├── /match                ④ 探索 / 瀏覽 Match 卡片頁 ★ 核心功能頁
├── /messages             ⑤ 配對成功後的對話列表
│   └── /messages/[id]       單一對話（含破冰經文/問題）
├── /profile/[id]            對象完整檔案（卡片點擊展開，後續迭代）
└── /me                      個人檔案與設定（後續迭代）
```

### 1.2 核心使用者流程 (User Flow)

```
                 ┌─────────────┐
   訪客 ───────▶ │  Landing /  │  認識理念、查看示範
                 └──────┬──────┘
                        │ 點「開始建立檔案」
                        ▼
                 ┌─────────────┐
                 │ ① /register │  建立帳戶 + Email 驗證
                 └──────┬──────┘
                        ▼
                 ┌──────────────────────┐
                 │ ② /onboarding/church │  必填：選擇固定聚會的教會
                 │   （可搜尋下拉選單）  │  ← 信任感的根基
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ ③ /onboarding/survey │  地區 + 靈命/生活習慣問卷
                 │   （契合度計算來源）  │
                 └──────────┬───────────┘
                            ▼
                 ┌─────────────┐
                 │ ④ /match    │ ★ 卡片式探索
                 │             │   右滑=想認識 / 左滑=再看看 / 上滑=為他禱告
                 └──────┬──────┘
                        │ 雙方都「想認識」→ 莊重的「配對成功」彈窗
                        ▼
                 ┌──────────────────────┐
                 │ ⑤ /messages          │  對話列表 → /messages/[id]
                 │   配對成功後的對話    │  以「破冰經文 / 問題」引導深度交流
                 └──────────────────────┘
```

### 1.3 流程設計的關鍵決策（與 Tinder 的差異）

| 面向 | Tinder 式速食 | 「同心」的調整 |
| --- | --- | --- |
| 進入門檻 | 註冊即可滑 | **強制填寫教會 + 問卷**才能進入探索 |
| 卡片資訊 | 外貌優先 | **教會、生命經文、靈命特質優先**，外貌為輔 |
| 互動動作 | 左滑/右滑 | 新增**「向上滑 = 為他/她禱告」**的社群專屬動作 |
| 節奏 | 鼓勵大量快速滑動 | 拉高滑動門檻、每日卡片有限、文案引導「慢慢看」 |
| 配對後 | 開放聊天 | 提供**破冰問題 / 經文**，引導有深度的對話 |

---

## 二、UI/UX 設計細節

### 2.1 Liquid Glass × 白/銀/金 的融合方式

**設計目標**：讓介面看起來像一層層**半透明的磨砂玻璃**，漂浮在乾淨的珍珠白背景上，
邊緣帶有銀色金屬反光、重點處透出溫暖金光。

具體手法（皆已實作於 `app/globals.css` 與 `tailwind.config.ts`）：

1. **背景層（流動光斑 Aurora）**
   - 珍珠白漸層底色 + 三顆極淡的「金 / 銀」放射狀光球 (`AuroraField`)。
   - 以純 CSS `@keyframes aurora` 緩慢漂移（18–28 秒一圈），透過上層玻璃的 `backdrop-filter`
     折射，形成「微光流動感」——這是 Liquid Glass 的靈魂。
   - 效能極低（只動 `transform`），且 `prefers-reduced-motion` 時自動停用。

2. **玻璃面板層（Glass）**
   - 配方：`background: rgba(255,255,255,0.55)` + `backdrop-filter: blur(22px) saturate(160%)`。
   - **內緣高光** `inset 0 1px 1px rgba(255,255,255,0.7)` 製造玻璃「厚度」與液態感。
   - **柔和投影**用偏冷的銀灰 `rgba(120,130,150,0.18)`，而非死黑，維持輕盈聖潔。

3. **銀→金漸層描邊（`.glass-ring`）**
   - 用 `mask-composite` 做出「只有 1px 邊框」的漸層：
     白 → 銀 → **金** → 白，模擬金屬在不同角度的折射。
   - 這是「銀的科技感」與「金的尊貴感」共存的關鍵細節。

4. **金色的「克制」使用（最重要的平衡原則）**
   - 金色**只**出現在：主要行動按鈕 (`.btn-gold`)、契合度徽章、重點圖示、標題的重點字
     (`.text-gold-gradient`)、CTA 光暈 (`shadow-gold-glow`)。
   - 大面積一律維持白 / 銀。金色占畫面比例控制在 **5–10%**，才顯得「尊貴」而非「俗豔」。

### 2.2 如何平衡「Tinder 現代感」與「基督教保守 / 認真」

這是本專案視覺上最關鍵的張力。設計策略如下：

| 衝突點 | 保守 / 莊重的解法 |
| --- | --- |
| **色彩** | 不用 Tinder 的烈焰漸層紅。改用白/銀的聖潔基調，金色僅作神聖點綴。 |
| **字體** | 標題與經文使用**襯線體 (Noto Serif TC)** 帶來典雅、莊重；內文用無襯線體保持現代易讀。 |
| **動畫** | 保留卡片滑動的「現代直覺」，但改用**柔和的 spring**（低剛性、高阻尼），動作慢而優雅，不浮誇。 |
| **滑動門檻** | 提高到 120px，避免「無腦快速滑」，呼應「認真」的理念。 |
| **資訊密度** | 卡片優先呈現**教會、生命經文、靈命特質**，外貌退居其次。 |
| **互動語彙** | 「Like」改為**「想認識」**、「Nope」改為**「再看看」**，並新增**「為他/她禱告」**。 |
| **留白** | 大量留白與圓潤的 `rounded-5xl`，營造從容、不擁擠的氛圍。 |

### 2.3 響應式 (Mobile-first)

- 卡片寬度 `max-w-sm`、比例 `aspect-[3/4.4]`，在手機上單手可及；桌機置中、兩側留白。
- 頂部導覽列為**膠囊狀玻璃 pill**，sticky 固定，桌機手機共用。
- 操作列 (`ActionBar`) 提供與滑動**等價的點擊按鈕**，兼顧桌機與無障礙。

### 2.4 無障礙 (Accessibility)

- 尊重 `prefers-reduced-motion`：關閉所有動畫與過場。
- 所有圖示按鈕有 `aria-label`；金色文字與白底的對比度經調校達 AA。
- 互動可純鍵盤 / 點擊完成，不強制依賴拖曳手勢。

---

## 三、前端技術選型建議

針對 **Animation Heavy** 與 **Liquid Glass** 兩大需求，推薦組合：

| 層級 | 選型 | 理由 |
| --- | --- | --- |
| **框架** | **Next.js 14 (App Router) + React 18 + TypeScript** | SSR/SEO、檔案路由貼合 Sitemap、`next/image` 最佳化人像、型別安全。 |
| **樣式** | **Tailwind CSS** | 用 utility + 自訂 `@layer components` 封裝玻璃配方，迭代快、樣式一致。 |
| **互動動畫** | **Framer Motion** | 卡片拖曳 (`drag` / `useMotionValue` / `useTransform`)、spring 過場、`AnimatePresence` 進出場，是卡片滑動體驗的最佳解。 |
| **圖示** | **lucide-react** | 線性、輕量、風格現代且莊重。 |
| **字體** | **next/font**（Inter + Noto Serif TC） | 自動最佳化、零 layout shift，襯線體支撐莊重感。 |

**Liquid Glass 的實作分工**：
- **主要靠 CSS**：`backdrop-filter: blur()` + 半透明底 + 漸層描邊，效能好、相容性佳，是 95% 玻璃感的來源。
- **Three.js / WebGL 視為「選配的加分項」**：僅在 Landing Hero 等少數位置，可加入 WebGL 流體 / 折射 shader 做更高級的光流。**不建議**全站使用，因為會大幅增加效能負擔與複雜度，且 `backdrop-filter` 已能達成需求。

**效能與相容性注意事項**：
- `backdrop-filter` 在低階行動裝置成本較高 → 限制同畫面玻璃層數、`will-change: transform` 只用在會動的元素。
- 提供 `@supports not (backdrop-filter: blur())` 的退化樣式（改用較高不透明度白底）。
- 動畫一律只動 `transform` / `opacity`，避免觸發 layout / paint。

**後端 / 基礎建設（建議，超出本次前端範圍）**：
- Auth：NextAuth / Clerk（Email + OAuth + 教會驗證）。
- DB：PostgreSQL（會員、教會、配對）+ Prisma。教會清單做成可搜尋的資料表。
- 媒體：物件儲存 (S3 / R2) + 影像審核。
- 配對：依問卷加權計算契合度的後端服務，逐步迭代為推薦系統。

---

## 四、核心頁面代碼框架

「瀏覽 Match 卡片頁」已**完整實作**並可執行，重點檔案如下：

| 檔案 | 角色 |
| --- | --- |
| `app/globals.css` | ★ **Liquid Glass 設計系統**（`.glass` / `.glass-ring` / `.btn-gold` / aurora 動畫）。 |
| `tailwind.config.ts` | 白/銀/金配色 scale、玻璃陰影、動畫 keyframes。 |
| `components/glass/AuroraField.tsx` | 背景流動光斑。 |
| `components/glass/GlassCard.tsx` | 可重用玻璃容器。 |
| `components/match/SwipeCard.tsx` | ★ **單張卡片**：Framer Motion 拖曳、旋轉、三方向意圖提示、飛出動畫。 |
| `components/match/SwipeDeck.tsx` | ★ **卡片堆疊狀態機**：指標、歷史（收回）、點擊↔拖曳統一。 |
| `components/match/ActionBar.tsx` | 下方操作列（再看看 / 為他禱告 / 想認識 / 收回）。 |
| `app/match/page.tsx` | ★ 探索頁本體。 |

### 4.1 Liquid Glass 樣式核心（節錄自 `app/globals.css`）

```css
.glass {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 8px 32px rgba(120, 130, 150, 0.18),   /* 冷調柔影 */
    inset 0 1px 1px rgba(255, 255, 255, 0.7); /* 內緣高光＝液態厚度 */
}

/* 銀→金漸層 1px 描邊 */
.glass-ring::before {
  content: "";
  position: absolute; inset: 0; padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg,
    rgba(255,255,255,.9) 0%, rgba(167,176,192,.55) 35%,
    rgba(201,162,75,.65) 75%, rgba(255,255,255,.85) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
```

### 4.2 卡片動畫核心（節錄自 `components/match/SwipeCard.tsx`）

```tsx
const x = useMotionValue(0);
const rotate = useTransform(x, [-220, 0, 220], [-12, 0, 12]); // 拖曳→旋轉
const likeOpacity = useTransform(x, [40, 130], [0, 1]);        // 「想認識」提示牌

<motion.div
  style={{ x, y, rotate }}
  drag={active && !exitDir}
  dragElastic={0.6}
  onDragEnd={(_, info) => {
    if (info.offset.x > 120) setExitDir("right");      // 想認識
    else if (info.offset.x < -120) setExitDir("left"); // 再看看
    else if (info.offset.y < -120) setExitDir("up");   // 為他禱告
  }}
  animate={exitDir
    ? { ...EXIT_TARGET[exitDir], opacity: 0 }           // 柔和飛出
    : { scale: 1 - index * 0.04, y: index * 14 }}       // 堆疊層次
  transition={{ type: "spring", stiffness: 260, damping: 30 }} // 莊重、不浮誇
  onAnimationComplete={() => { if (exitDir) onSwipe(exitDir, profile); }}
/>
```

> 完整、可執行的程式碼請見對應檔案；下方「如何執行」可在本機啟動實際體驗。

---

## 如何執行 (Getting Started)

```bash
npm install
npm run dev      # 開發模式 http://localhost:3000
npm run build    # 正式打包驗證
```

主要可瀏覽路徑：`/`（首頁）→ `/register` → `/onboarding/church` → `/onboarding/survey` → `/match`（核心卡片頁，對高契合度對象右滑會觸發「配對成功」）→ `/messages` → `/messages/m1`（含破冰提示的對話）。

---

## 後續迭代建議 (Roadmap)

1. ~~**配對後對話 `/messages`**：附「破冰經文 / 問題」引導深度交流。~~ ✅ **已實作**（對話列表 + 單一對話 + 破冰提示 + 配對成功彈窗）。
2. **教會驗證機制**：與教會行政或牧者協作的可信徽章。
3. **契合度演算法**：將問卷權重化，逐步演進為推薦系統。
4. **安全與檢舉**：照片審核、實名驗證、檢舉與封鎖流程。
5. **WebGL 加分特效**：僅在 Landing Hero 加入流體折射 shader。
```
