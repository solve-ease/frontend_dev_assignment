const nextConfig = {
  experimental: { appDir: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["randomuser.me"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
