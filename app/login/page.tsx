"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cross, Mail, Lock } from "lucide-react";
import { type FormEvent } from "react";
import { GlassCard } from "@/components/glass/GlassCard";

/** 登入頁。Demo 直接導向探索頁，正式環境串接 Auth。 */
export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/match");
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
          <Cross className="h-4 w-4 text-white" />
        </span>
        <span className="font-serif text-lg font-semibold text-silver-700">同心</span>
      </Link>

      <GlassCard className="p-7">
        <h1 className="font-serif text-2xl font-semibold text-silver-700">歡迎回來</h1>
        <p className="mt-1 text-sm text-silver-500">繼續這段以神為中心的尋覓。</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="glass glass-ring flex items-center gap-2 rounded-2xl px-4 py-3 text-silver-400">
            <Mail className="h-4 w-4" />
            <input required type="email" placeholder="電子郵件" className="w-full bg-transparent text-sm text-silver-700 placeholder:text-silver-400 focus:outline-none" />
          </label>
          <label className="glass glass-ring flex items-center gap-2 rounded-2xl px-4 py-3 text-silver-400">
            <Lock className="h-4 w-4" />
            <input required type="password" placeholder="密碼" className="w-full bg-transparent text-sm text-silver-700 placeholder:text-silver-400 focus:outline-none" />
          </label>
          <button type="submit" className="btn-gold mt-2 w-full">登入</button>
        </form>

        <p className="mt-5 text-center text-sm text-silver-500">
          還沒有帳戶？{" "}
          <Link href="/register" className="text-gold-600 hover:underline">
            立即註冊
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}
