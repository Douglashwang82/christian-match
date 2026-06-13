"use client";

import Image from "next/image";
import {
  type PanInfo,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Church, MapPin, Quote } from "lucide-react";
import type { MatchProfile, SwipeDirection } from "@/lib/types";

interface SwipeCardProps {
  profile: MatchProfile;
  /** 是否為堆疊最上層（唯一可拖曳的卡片）*/
  active: boolean;
  /** 在堆疊中的層級，0 = 最上層，用於計算後方卡片的縮放與位移 */
  index: number;
  /** 由操作列點擊觸發的飛出方向（只對最上層卡片有意義）*/
  forceExit?: SwipeDirection | null;
  /** 卡片飛出動畫完成後通知父層前進 */
  onSwipe: (direction: SwipeDirection, profile: MatchProfile) => void;
}

// 觸發滑出的水平 / 垂直門檻（px）。刻意調高，符合「溫和、不衝動」的產品調性。
const SWIPE_THRESHOLD = 120;

const EXIT_TARGET: Record<SwipeDirection, { x: number; y: number; rotate: number }> = {
  left: { x: -600, y: 0, rotate: -20 },
  right: { x: 600, y: 0, rotate: 20 },
  up: { x: 0, y: -700, rotate: 0 },
};

export function SwipeCard({
  profile,
  active,
  index,
  forceExit,
  onSwipe,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 隨拖曳產生輕微旋轉，模擬實體卡片的手感
  const rotate = useTransform(x, [-220, 0, 220], [-12, 0, 12]);

  // 三個方向的意圖提示牌透明度
  const likeOpacity = useTransform(x, [40, 130], [0, 1]);
  const nopeOpacity = useTransform(x, [-130, -40], [1, 0]);
  const prayOpacity = useTransform(y, [-130, -40], [1, 0]);

  const [exitDir, setExitDir] = useState<SwipeDirection | null>(null);

  // 操作列點擊：被指定方向時觸發飛出
  useEffect(() => {
    if (active && forceExit && !exitDir) setExitDir(forceExit);
  }, [active, forceExit, exitDir]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const { offset } = info;
    if (offset.x > SWIPE_THRESHOLD) setExitDir("right");
    else if (offset.x < -SWIPE_THRESHOLD) setExitDir("left");
    else if (offset.y < -SWIPE_THRESHOLD) setExitDir("up");
  }

  // 後方卡片的堆疊外觀：每往下一層，縮小一點、下沉一點
  const stackScale = 1 - index * 0.04;
  const stackY = index * 14;

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{ x, y, rotate, zIndex: 100 - index }}
      drag={active && !exitDir}
      dragElastic={0.6}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={active ? handleDragEnd : undefined}
      initial={false}
      animate={
        exitDir
          ? { ...EXIT_TARGET[exitDir], opacity: 0 }
          : { scale: stackScale, y: stackY, opacity: 1 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      onAnimationComplete={() => {
        // 只有「飛出」動畫完成才前進，堆疊歸位 / 晉升動畫不觸發
        if (exitDir) onSwipe(exitDir, profile);
      }}
    >
      <div className="glass-strong glass-ring relative h-full w-full overflow-hidden rounded-5xl">
        {/* 主照片 */}
        <div className="relative h-[68%] w-full overflow-hidden">
          <Image
            src={profile.photos[0]}
            alt={profile.name}
            fill
            priority={active}
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover"
          />
          {/* 照片底部白色漸層，讓玻璃資訊區與照片自然銜接 */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white/85 via-white/30 to-transparent" />

          {/* 契合度徽章（金色、克制） */}
          <div className="absolute right-4 top-4 glass glass-ring rounded-full px-3 py-1.5 text-xs font-semibold">
            <span className="text-gold-gradient">契合度 {profile.compatibility}%</span>
          </div>

          {/* 意圖提示牌 */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute left-5 top-6 -rotate-12 rounded-xl border-2 border-gold-500 px-4 py-1.5 text-lg font-bold text-gold-600"
          >
            想認識
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute right-5 top-6 rotate-12 rounded-xl border-2 border-silver-400 px-4 py-1.5 text-lg font-bold text-silver-500"
          >
            再看看
          </motion.div>
          <motion.div
            style={{ opacity: prayOpacity }}
            className="absolute inset-x-0 top-1/3 mx-auto w-fit rounded-xl border-2 border-gold-400 bg-white/40 px-4 py-1.5 text-lg font-bold text-gold-600 backdrop-blur"
          >
            為他/她禱告 🙏
          </motion.div>
        </div>

        {/* 資訊區（玻璃面板） */}
        <div className="flex h-[32%] flex-col gap-2 px-6 py-4">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-2xl font-semibold text-silver-700">
              {profile.name}
            </h2>
            <span className="text-lg text-silver-500">{profile.age}</span>
            <span className="ml-auto flex items-center gap-1 text-sm text-silver-500">
              <MapPin className="h-3.5 w-3.5" /> {profile.city}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-silver-600">
            <Church className="h-4 w-4 text-gold-500" />
            <span className="truncate">
              {profile.church.name} · {profile.church.denomination}
            </span>
          </div>

          {profile.faith.lifeVerse && (
            <p className="flex items-start gap-1.5 text-xs italic text-silver-500">
              <Quote className="mt-0.5 h-3 w-3 shrink-0 text-gold-400" />
              <span className="line-clamp-1">{profile.faith.lifeVerse}</span>
            </p>
          )}

          <div className="mt-auto flex flex-wrap gap-1.5">
            {profile.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-silver-200 bg-white/50 px-2.5 py-0.5 text-xs text-silver-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
