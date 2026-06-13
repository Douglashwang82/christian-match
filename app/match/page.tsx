import { AppHeader } from "@/components/layout/AppHeader";
import { SwipeDeck } from "@/components/match/SwipeDeck";
import { MOCK_PROFILES } from "@/lib/mock-data";

export const metadata = {
  title: "探索 · 同心",
};

/**
 * 探索 / 瀏覽 Match 卡片頁（核心功能頁）。
 *
 * 設計取捨：沿用 Tinder 的卡片滑動直覺，但
 *  - 節奏更慢：滑動門檻拉高、動畫採柔和 spring
 *  - 資訊聚焦信仰：教會、生命經文、靈命特質優先於外貌
 *  - 新增「為他/她禱告」(向上滑) 這個專屬基督教社群的溫和互動
 *
 * 正式環境：profiles 改由後端依問卷契合度、地區、教會分流推薦取得。
 */
export default function MatchPage() {
  return (
    <main className="relative min-h-dvh pb-10">
      <AppHeader />

      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-6">
        <div className="mb-6 text-center">
          <h1 className="font-serif text-2xl font-semibold text-silver-700">
            今天為你預備的相遇
          </h1>
          <p className="mt-1 text-sm text-silver-500">
            慢慢看、用心讀。合適的人，值得多一點時間認識。
          </p>
        </div>

        <SwipeDeck profiles={MOCK_PROFILES} />

        <p className="mt-8 max-w-xs text-center text-xs leading-relaxed text-silver-400">
          向右滑 = 想認識 ·  向左滑 = 再看看 ·  向上滑 = 為他/她禱告
        </p>
      </section>
    </main>
  );
}
