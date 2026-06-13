import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_TC } from "next/font/google";
import { AuroraField } from "@/components/glass/AuroraField";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// 襯線體用於品牌標題與經文引用，強化莊重、典雅的氣質
const serif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "同心 · 基督徒深度交友",
  description:
    "專屬於基督徒的相親與深度交友平台。以教會為根、以信仰為本，認真尋找一生的同行者。",
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AuroraField />
        {children}
      </body>
    </html>
  );
}
