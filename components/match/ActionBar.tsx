"use client";

import { motion } from "framer-motion";
import { HandHeart, Heart, RotateCcw, X } from "lucide-react";
import type { SwipeDirection } from "@/lib/types";

interface ActionBarProps {
  onAction: (direction: SwipeDirection) => void;
  onUndo: () => void;
  canUndo: boolean;
}

/**
 * 卡片下方的操作列。提供與滑動等價的點擊操作（無障礙 / 桌機友善），
 * 三顆主鈕：再看看（左）、為他禱告（上）、想認識（右）。
 */
export function ActionBar({ onAction, onUndo, canUndo }: ActionBarProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <CircleButton label="收回上一張" onClick={onUndo} disabled={!canUndo} size="sm">
        <RotateCcw className="h-5 w-5 text-silver-500" />
      </CircleButton>

      <CircleButton label="再看看" onClick={() => onAction("left")} size="lg">
        <X className="h-7 w-7 text-silver-500" />
      </CircleButton>

      <CircleButton label="為他/她禱告" onClick={() => onAction("up")} size="md" tone="gold-soft">
        <HandHeart className="h-6 w-6 text-gold-600" />
      </CircleButton>

      <CircleButton label="想認識" onClick={() => onAction("right")} size="lg" tone="gold">
        <Heart className="h-7 w-7 text-white" fill="white" />
      </CircleButton>
    </div>
  );
}

function CircleButton({
  children,
  label,
  onClick,
  disabled,
  size = "md",
  tone = "glass",
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "glass" | "gold" | "gold-soft";
}) {
  const sizes = { sm: "h-11 w-11", md: "h-14 w-14", lg: "h-16 w-16" };
  const tones = {
    glass: "glass glass-ring",
    "gold-soft": "glass glass-ring shadow-gold-glow",
    gold: "btn-gold !p-0 !rounded-full shadow-gold-glow",
  };

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: disabled ? 1 : 1.08 }}
      className={`grid place-items-center rounded-full transition-opacity ${sizes[size]} ${tones[tone]} ${
        disabled ? "cursor-not-allowed opacity-40" : ""
      }`}
    >
      {children}
    </motion.button>
  );
}
