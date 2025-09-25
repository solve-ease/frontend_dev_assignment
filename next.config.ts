import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // ✅ important
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],  // external images
  },
};

export default nextConfig;