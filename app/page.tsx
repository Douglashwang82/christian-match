import Link from "next/link";
import { Church, Cross, HandHeart, ShieldCheck, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";

export default function LandingPage() {
  return (
    <main className="relative mx-auto flex min-h-dvh max-w-5xl flex-col items-center px-5 py-10">
      {/* 品牌 */}
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
          <Cross className="h-5 w-5 text-white" />
        </span>
        <span className="font-serif text-xl font-semibold tracking-wide text-silver-700">
          同心
        </span>
      </div>

      {/* Hero */}
      <section className="mt-16 flex flex-col items-center text-center">
        <span className="glass glass-ring rounded-full px-4 py-1.5 text-xs font-medium text-silver-600">
          以教會為根 · 以信仰為本
        </span>
        <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-silver-700 sm:text-5xl">
          認真地，
          <span className="text-gold-gradient">尋找一生的同行者</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-silver-500">
          專屬於基督徒的深度交友平台。我們不追求速食的滑動，而是幫助你在禱告與時間裡，
          遇見同有信仰根基、願意一起建立家庭祭壇的弟兄姊妹。
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="btn-gold">
            開始建立檔案
          </Link>
          <Link href="/match" className="btn-silver">
            先看看示範
          </Link>
        </div>
      </section>

      {/* 三大理念 */}
      <section className="mt-20 grid w-full gap-5 sm:grid-cols-3">
        <Feature
          icon={<Church className="h-6 w-6 text-gold-500" />}
          title="教會歸屬"
          desc="每位會員都需填寫固定聚會的教會，建立可信任的群體背景。"
        />
        <Feature
          icon={<HandHeart className="h-6 w-6 text-gold-500" />}
          title="靈命優先"
          desc="以信仰、生命經文與生活習慣配對，認識比外貌更深的彼此。"
        />
        <Feature
          icon={<ShieldCheck className="h-6 w-6 text-gold-500" />}
          title="認真而安全"
          desc="實名與教會驗證、溫和的互動節奏，遠離速食與不尊重的關係。"
        />
      </section>

      {/* 流程預覽 */}
      <section className="mt-16 w-full">
        <GlassCard className="px-6 py-8 sm:px-10">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-500" />
            <h2 className="font-serif text-xl font-semibold text-silver-700">
              四步驟，開始這段同行
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-4">
            {[
              ["註冊與驗證", "建立帳戶並完成基本驗證"],
              ["填寫教會", "選擇你固定聚會的教會"],
              ["配對問卷", "設定地區與靈命/生活習慣"],
              ["探索相遇", "用心瀏覽為你預備的對象"],
            ].map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-1">
                <span className="font-serif text-2xl text-gold-gradient">
                  0{i + 1}
                </span>
                <span className="font-medium text-silver-700">{t}</span>
                <span className="text-sm text-silver-500">{d}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </section>

      <footer className="mt-16 text-center text-xs text-silver-400">
        © {new Date().getFullYear()} 同心 ChristianMatch ·  願神祝福每一段以祂為中心的關係
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <GlassCard sheen className="flex flex-col gap-3 p-6">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/60 shadow-inner-glass">
        {icon}
      </span>
      <h3 className="font-serif text-lg font-semibold text-silver-700">{title}</h3>
      <p className="text-sm leading-relaxed text-silver-500">{desc}</p>
    </GlassCard>
  );
}
