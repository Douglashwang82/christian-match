"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlassCard } from "@/components/glass/GlassCard";
import { Stepper } from "@/components/onboarding/Stepper";

/**
 * 步驟 3：地區設定 + 簡單的靈命 / 生活習慣問卷。
 * 結果用於溫和的契合度排序（非排名施壓）。Demo 僅前端蒐集。
 */
const CITIES = ["台北市", "新北市", "桃園市", "新竹市", "台中市", "台南市", "高雄市"];
const DEVOTION = [
  { value: "daily", label: "每日靈修" },
  { value: "weekly", label: "每週數次" },
  { value: "occasional", label: "偶爾" },
];
const PACE = [
  { value: "slow", label: "慢慢認識，先做朋友" },
  { value: "steady", label: "穩定推進，以婚姻為前提" },
  { value: "open", label: "順其自然，交給神帶領" },
];

export default function SurveyPage() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const [devotion, setDevotion] = useState<string>("");
  const [pace, setPace] = useState<string>("");

  const ready = city && devotion && pace;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-10">
      <div className="mt-2">
        <Stepper current={2} />
      </div>

      <GlassCard className="mt-8 p-7">
        <h1 className="font-serif text-2xl font-semibold text-silver-700">
          認識你一點點
        </h1>
        <p className="mt-1 text-sm text-silver-500">
          幾個簡單的問題，幫助我們為你預備更合適的相遇。
        </p>

        <div className="mt-6 flex flex-col gap-6">
          <Group label="你主要的生活地區">
            <Pills options={CITIES.map((c) => ({ value: c, label: c }))} value={city} onSelect={setCity} />
          </Group>

          <Group label="你的靈修頻率">
            <Pills options={DEVOTION} value={devotion} onSelect={setDevotion} />
          </Group>

          <Group label="你期待的交往步調">
            <Pills options={PACE} value={pace} onSelect={setPace} columns />
          </Group>
        </div>

        <button
          type="button"
          disabled={!ready}
          onClick={() => router.push("/match")}
          className="btn-gold mt-8 w-full disabled:opacity-50"
        >
          完成，開始探索
        </button>
      </GlassCard>
    </main>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-silver-600">{label}</span>
      {children}
    </div>
  );
}

function Pills({
  options,
  value,
  onSelect,
  columns,
}: {
  options: { value: string; label: string }[];
  value: string;
  onSelect: (v: string) => void;
  columns?: boolean;
}) {
  return (
    <div className={columns ? "flex flex-col gap-2" : "flex flex-wrap gap-2"}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-all ${
              columns ? "text-left" : ""
            } ${
              selected
                ? "border-gold-400 bg-gold-50 text-gold-700 shadow-gold-glow"
                : "border-silver-200 bg-white/50 text-silver-600 hover:bg-white/70"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
