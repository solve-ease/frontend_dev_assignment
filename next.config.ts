import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
    // Some remote hosts intermittently block the Image Optimizer on Vercel.
    // Disable optimization to avoid 502 from /_next/image for those hosts.
    unoptimized: true,
  }
};

export default nextConfig;
