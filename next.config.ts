/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**", // allow all subpaths
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
