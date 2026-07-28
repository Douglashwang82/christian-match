"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import type { Icebreaker } from "@/lib/types";

interface IcebreakersProps {
  items: Icebreaker[];
  /** 點選某個破冰問題 → 帶入輸入框 */
  onPick: (question: string) => void;
  /** 尚未有任何對話時，提示更醒目 */
  prominent?: boolean;
}

/**
 * 破冰提示面板 —「同心」的差異化互動。
 * 配對後不從空白開始：提供一段經文與可直接開啟話題的問題，
 * 引導使用者展開有信仰深度的第一句話。
 */
export function Icebreakers({ items, onPick, prominent }: IcebreakersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass glass-ring rounded-3xl p-4 ${prominent ? "shadow-gold-glow" : ""}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-gold-500" />
        <span className="text-sm font-medium text-silver-600">破冰提示</span>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((ib, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            {ib.verse && (
              <p className="flex items-start gap-1.5 text-xs italic text-gold-600">
                <Quote className="mt-0.5 h-3 w-3 shrink-0 text-gold-400" />
                <span>{ib.verse}</span>
              </p>
            )}
            <button
              type="button"
              onClick={() => onPick(ib.question)}
              className="rounded-2xl border border-silver-200 bg-white/50 px-3.5 py-2.5 text-left text-sm text-silver-600 transition-colors hover:border-gold-300 hover:bg-white/70"
            >
              {ib.question}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
