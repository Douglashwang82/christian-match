/**
 * AuroraField — 全頁背景的流動光斑。
 * 三顆極淡的金/銀色光球緩慢漂移，透過玻璃面板的 backdrop-blur 折射，
 * 形成 Liquid Glass 的「微光流動感」。純 CSS 動畫，效能負擔極低。
 */
export function AuroraField() {
  return (
    <div className="aurora-field" aria-hidden>
      <div
        className="aurora-blob left-[-10%] top-[-8%] h-[42vmax] w-[42vmax] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(201,162,75,0.40), transparent 60%)",
        }}
      />
      <div
        className="aurora-blob right-[-12%] top-[18%] h-[38vmax] w-[38vmax] animate-aurora-slow"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(167,176,192,0.45), transparent 62%)",
        }}
      />
      <div
        className="aurora-blob bottom-[-14%] left-[22%] h-[40vmax] w-[40vmax] animate-aurora"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(224,198,119,0.30), transparent 60%)",
        }}
      />
    </div>
  );
}
