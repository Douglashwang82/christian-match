import { Check } from "lucide-react";

const STEPS = ["註冊", "教會", "問卷", "探索"] as const;

/** 引導流程的進度指示，金色代表已完成 / 當前步驟 */
export function Stepper({ current }: { current: number }) {
  return (
    <div className="mx-auto flex max-w-md items-center justify-between">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-colors ${
                  done
                    ? "bg-gradient-to-br from-gold-300 to-gold-600 text-white"
                    : active
                      ? "glass glass-ring text-gold-600"
                      : "glass text-silver-400"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`text-xs ${active ? "text-gold-600" : "text-silver-400"}`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`mx-2 h-px flex-1 ${done ? "bg-gold-300" : "bg-silver-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
