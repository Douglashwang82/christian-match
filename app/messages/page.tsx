import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/glass/GlassCard";
import { CONVERSATIONS } from "@/lib/messages-data";

export const metadata = {
  title: "訊息 · 同心",
};

/**
 * 對話列表頁。呈現所有配對成功的對象；尚未開啟對話者標示「新配對」，
 * 引導使用者用破冰提示展開有深度的第一句話。
 */
export default function MessagesPage() {
  return (
    <main className="relative min-h-dvh pb-10">
      <AppHeader active="messages" />

      <section className="mx-auto flex max-w-2xl flex-col px-4 pt-6">
        <div className="mb-5 px-1">
          <h1 className="font-serif text-2xl font-semibold text-silver-700">訊息</h1>
          <p className="mt-1 text-sm text-silver-500">
            用心回覆每一句。認真的關係，從真誠的對話開始。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {CONVERSATIONS.map((c) => {
            const last = c.messages[c.messages.length - 1];
            const isNew = c.messages.length === 0;
            return (
              <Link key={c.id} href={`/messages/${c.id}`}>
                <GlassCard sheen className="flex items-center gap-4 p-4 transition-transform hover:scale-[1.01]">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={c.profile.photos[0]}
                      alt={c.profile.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-semibold text-silver-700">
                        {c.profile.name}
                      </span>
                      {isNew && (
                        <span className="flex items-center gap-1 rounded-full bg-gold-50 px-2 py-0.5 text-[11px] font-medium text-gold-600">
                          <Sparkles className="h-3 w-3" /> 新配對
                        </span>
                      )}
                      <span className="ml-auto shrink-0 text-xs text-silver-400">
                        {c.lastTime}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-silver-500">
                      {isNew ? "有破冰提示等你開啟第一句話" : last?.text}
                    </p>
                  </div>

                  {c.unread > 0 ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-1.5 text-xs font-semibold text-white">
                      {c.unread}
                    </span>
                  ) : (
                    <ChevronRight className="h-5 w-5 shrink-0 text-silver-300" />
                  )}
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
