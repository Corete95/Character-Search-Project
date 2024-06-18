/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["open.api.nexon.com", "mesoya.vercel.app"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [350, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "open.api.nexon.com",
        port: "",
        pathname: "/user/**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
