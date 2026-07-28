import Link from "next/link";
import { Cross, MessageCircleHeart, UserRound } from "lucide-react";

/**
 * AppHeader — 登入後主功能區的頂部玻璃導覽列。
 * 桌機固定在頂部，手機端維持輕量、不喧賓奪主。
 */
export function AppHeader({ active }: { active?: "match" | "messages" }) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="glass glass-ring mx-auto flex max-w-2xl items-center justify-between rounded-full px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
            <Cross className="h-4 w-4 text-white" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-wide text-silver-700">
            同心
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavIcon href="/match" label="探索" active={active === "match"}>
            <UserRound className="h-5 w-5" />
          </NavIcon>
          <NavIcon href="/messages" label="訊息" active={active === "messages"}>
            <MessageCircleHeart className="h-5 w-5" />
          </NavIcon>
        </nav>
      </div>
    </header>
  );
}

function NavIcon({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
        active
          ? "bg-white/70 text-gold-600 shadow-inner-glass"
          : "text-silver-500 hover:bg-white/40"
      }`}
    >
      {children}
    </Link>
  );
}
