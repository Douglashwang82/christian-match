"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { ActionBar } from "@/components/match/ActionBar";
import { MatchModal } from "@/components/match/MatchModal";
import { SwipeCard } from "@/components/match/SwipeCard";
import type { MatchProfile, SwipeDirection } from "@/lib/types";

// Demo：對高契合度對象表達「想認識」時，模擬「彼此都想認識」的配對成功。
// 正式環境改為後端雙向 like 判定。
const MUTUAL_MATCH_THRESHOLD = 88;

interface SwipeDeckProps {
  profiles: MatchProfile[];
}

interface SwipeRecord {
  profile: MatchProfile;
  direction: SwipeDirection;
}

/**
 * SwipeDeck — 卡片堆疊狀態機。
 * 維護目前指標、歷史紀錄（供「收回」），並把點擊操作轉成與拖曳一致的滑出動畫。
 * 後三張卡片預先渲染成堆疊，營造立體層次。
 */
export function SwipeDeck({ profiles }: SwipeDeckProps) {
  const [cursor, setCursor] = useState(0);
  const [history, setHistory] = useState<SwipeRecord[]>([]);
  // 點擊操作時，告訴最上層卡片要往哪個方向飛出
  const [programmaticExit, setProgrammaticExit] = useState<SwipeDirection | null>(null);
  // 配對成功時要慶祝的對象
  const [matched, setMatched] = useState<MatchProfile | null>(null);

  const advance = useCallback((direction: SwipeDirection, profile: MatchProfile) => {
    setHistory((h) => [...h, { profile, direction }]);
    setCursor((c) => c + 1);
    setProgrammaticExit(null);
    if (direction === "right" && profile.compatibility >= MUTUAL_MATCH_THRESHOLD) {
      setMatched(profile);
    }
  }, []);

  const handleAction = useCallback(
    (direction: SwipeDirection) => {
      if (cursor >= profiles.length) return;
      setProgrammaticExit(direction);
    },
    [cursor, profiles.length],
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    setHistory((h) => h.slice(0, -1));
    setCursor((c) => Math.max(0, c - 1));
  }, [history.length]);

  // 只渲染目前及其後兩張，降低 DOM 與動畫負擔
  const visible = useMemo(
    () => profiles.slice(cursor, cursor + 3),
    [profiles, cursor],
  );

  const finished = cursor >= profiles.length;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[3/4.4] w-full max-w-sm">
        <AnimatePresence>
          {finished ? (
            <EmptyState key="empty" />
          ) : (
            // 反向渲染：最上層卡片最後掛載，確保 z-index 堆疊與事件命中正確
            [...visible]
              .reverse()
              .map((profile) => {
                const i = visible.indexOf(profile);
                return (
                  <SwipeCard
                    key={profile.id}
                    profile={profile}
                    index={i}
                    active={i === 0}
                    forceExit={i === 0 ? programmaticExit : null}
                    onSwipe={(dir, p) => advance(dir, p)}
                  />
                );
              })
          )}
        </AnimatePresence>
      </div>

      {!finished && (
        <ActionBar
          onAction={handleAction}
          onUndo={handleUndo}
          canUndo={history.length > 0}
        />
      )}

      <AnimatePresence>
        {matched && (
          <MatchModal profile={matched} onContinue={() => setMatched(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-strong glass-ring absolute inset-0 grid place-items-center rounded-5xl p-8 text-center"
    >
      <div className="flex flex-col items-center gap-3">
        <Sparkles className="h-10 w-10 text-gold-500" />
        <h3 className="font-serif text-xl font-semibold text-silver-700">
          今天的緣分先到這裡
        </h3>
        <p className="max-w-xs text-sm text-silver-500">
          我們會繼續為你預備合適的弟兄姊妹。不妨先為今天認識的人禱告，明天再回來看看。
        </p>
      </div>
    </motion.div>
  );
}
