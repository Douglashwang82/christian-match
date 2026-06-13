/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Demo 期間允許 Unsplash 佔位人像，正式環境請改為自有 CDN / 物件儲存
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
