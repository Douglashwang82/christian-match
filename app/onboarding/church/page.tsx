"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlassCard } from "@/components/glass/GlassCard";
import { ChurchSelect } from "@/components/onboarding/ChurchSelect";
import { Stepper } from "@/components/onboarding/Stepper";
import type { Church } from "@/lib/types";

/** 步驟 2：填寫教會歸屬（強制，建立可信任的群體背景）。 */
export default function ChurchOnboardingPage() {
  const router = useRouter();
  const [church, setChurch] = useState<Church | null>(null);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-10">
      <div className="mt-2">
        <Stepper current={1} />
      </div>

      <GlassCard className="mt-8 p-7">
        <h1 className="font-serif text-2xl font-semibold text-silver-700">
          你固定聚會的教會
        </h1>
        <p className="mt-1 text-sm text-silver-500">
          教會歸屬是「同心」信任感的根基，也是配對時的重要參考。請選擇你目前穩定參加的教會。
        </p>

        <div className="mt-6">
          <ChurchSelect value={church} onChange={setChurch} />
        </div>

        <button
          type="button"
          disabled={!church}
          onClick={() => router.push("/onboarding/survey")}
          className="btn-gold mt-8 w-full disabled:opacity-50"
        >
          下一步
        </button>

        <p className="mt-4 text-center text-xs text-silver-400">
          找不到你的教會？
          <Link href="#" className="ml-1 text-gold-600 hover:underline">
            申請新增
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}
