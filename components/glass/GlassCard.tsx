import { type HTMLAttributes, forwardRef } from "react";

type Variant = "default" | "strong";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  /** 是否套用銀→金漸層描邊 */
  ring?: boolean;
  /** hover 時是否掠過液態高光 */
  sheen?: boolean;
}

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * GlassCard — Liquid Glass 的基礎容器。
 * 把 .glass / .glass-ring / .glass-sheen 等設計系統 class 組合成可重用元件，
 * 全站所有面板（卡片、彈窗、導覽列、按鈕群）都以它為基礎堆疊。
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    { variant = "default", ring = true, sheen = false, className, children, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          "relative overflow-hidden rounded-4xl",
          variant === "strong" ? "glass-strong" : "glass",
          ring && "glass-ring",
          sheen && "glass-sheen",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
