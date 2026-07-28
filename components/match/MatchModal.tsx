"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HandHeart } from "lucide-react";
import type { MatchProfile } from "@/lib/types";

/**
 * 配對成功彈窗。刻意採莊重、溫暖的呈現（非煙火式狂歡），
 * 呼應「認真交往」的調性，並引導進入有破冰提示的對話。
 */
export function MatchModal({
  profile,
  onContinue,
}: {
  profile: MatchProfile;
  onContinue: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 柔和玻璃遮罩 */}
      <div
        className="absolute inset-0 bg-white/40 backdrop-blur-md"
        onClick={onContinue}
      />

      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="glass-strong glass-ring relative w-full max-w-sm overflow-hidden rounded-5xl p-8 text-center"
      >
        <p className="font-serif text-sm tracking-widest text-gold-600">彼此都想認識</p>
        <h2 className="mt-1 font-serif text-3xl font-bold">
          <span className="text-gold-gradient">願神帶領這段相遇</span>
        </h2>

        <div className="my-7 flex items-center justify-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-3xl shadow-glass-lg">
            <Image
              src={profile.photos[0]}
              alt={profile.name}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <span className="-ml-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
            <HandHeart className="h-6 w-6 text-white" />
          </span>
        </div>

        <p className="text-sm text-silver-500">
          你和 <span className="font-semibold text-silver-700">{profile.name}</span>{" "}
          都表達了想認識彼此。我們為你們預備了破冰提示，慢慢開始吧。
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          <Link href="/messages" className="btn-gold w-full">
            開始對話
          </Link>
          <button type="button" onClick={onContinue} className="btn-silver w-full">
            繼續探索
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
