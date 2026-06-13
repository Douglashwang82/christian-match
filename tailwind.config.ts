import type { Config } from "tailwindcss";

/**
 * 配色策略：
 *  - 主色「白」：頁面底色與玻璃面板基底，營造聖潔、乾淨的空間感。
 *  - 輔色「銀」：邊框、分隔線、次要文字與金屬反光，帶來現代科技感。
 *  - 點綴「金」：CTA、重點圖示、光暈，象徵神聖、溫暖與尊貴（嚴格控制用量）。
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          DEFAULT: "#FBFBFD",
          50: "#FFFFFF",
          100: "#F6F7F9",
          200: "#EEF0F4",
        },
        silver: {
          50: "#F4F6F9",
          100: "#E7EBF1",
          200: "#D9DEE7",
          300: "#C3CAD6",
          400: "#A7B0C0",
          500: "#8A93A3",
          600: "#6B7382",
          700: "#4E5562",
        },
        gold: {
          50: "#FBF6E9",
          100: "#F5E9CC",
          200: "#EAD79B",
          300: "#E0C677",
          400: "#D4B254",
          500: "#C9A24B", // 主點綴金
          600: "#A9853A",
          700: "#86692C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(120, 130, 150, 0.18)",
        "glass-lg": "0 24px 64px rgba(120, 130, 150, 0.22)",
        "gold-glow": "0 0 24px rgba(201, 162, 75, 0.45)",
        "inner-glass": "inset 0 1px 1px rgba(255, 255, 255, 0.65)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(4%, -6%, 0) rotate(8deg)" },
          "66%": { transform: "translate3d(-5%, 4%, 0) rotate(-6deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 28s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
