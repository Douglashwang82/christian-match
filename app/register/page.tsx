"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cross, Mail, Lock, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import { GlassCard } from "@/components/glass/GlassCard";
import { Stepper } from "@/components/onboarding/Stepper";

/**
 * 步驟 1：註冊。Demo 僅做前端表單與導流，
 * 正式環境串接 Auth（Email 驗證 / OAuth）後再進入教會填寫。
 */
export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: 呼叫註冊 API，成功後導向教會填寫
    setTimeout(() => router.push("/onboarding/church"), 600);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-10">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
          <Cross className="h-4 w-4 text-white" />
        </span>
        <span className="font-serif text-lg font-semibold text-silver-700">同心</span>
      </Link>

      <Stepper current={0} />

      <GlassCard className="mt-8 p-7">
        <h1 className="font-serif text-2xl font-semibold text-silver-700">
          建立你的帳戶
        </h1>
        <p className="mt-1 text-sm text-silver-500">
          一段以信仰為中心的關係，從這裡開始。
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Field icon={<UserRound className="h-4 w-4" />} label="暱稱">
            <input required type="text" placeholder="你希望別人怎麼稱呼你" className="field-input" />
          </Field>
          <Field icon={<Mail className="h-4 w-4" />} label="電子郵件">
            <input required type="email" placeholder="you@example.com" className="field-input" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="密碼">
            <input required type="password" placeholder="至少 8 碼" className="field-input" minLength={8} />
          </Field>

          <button type="submit" disabled={submitting} className="btn-gold mt-2 w-full disabled:opacity-60">
            {submitting ? "建立中…" : "註冊並繼續"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-silver-500">
          已經有帳戶了？{" "}
          <Link href="/login" className="text-gold-600 hover:underline">
            登入
          </Link>
        </p>
      </GlassCard>

      <style>{`
        .field-input {
          width: 100%;
          background: transparent;
          font-size: 0.875rem;
          color: #4e5562;
        }
        .field-input::placeholder { color: #a7b0c0; }
        .field-input:focus { outline: none; }
      `}</style>
    </main>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-silver-500">{label}</span>
      <span className="glass glass-ring flex items-center gap-2 rounded-2xl px-4 py-3 text-silver-400">
        {icon}
        {children}
      </span>
    </label>
  );
}
