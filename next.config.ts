import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/a-propos", destination: "/", permanent: false },
      { source: "/merch", destination: "/shop", permanent: false },
      { source: "/offense", destination: "/", permanent: false },
      { source: "/quiz", destination: "/", permanent: false },
      { source: "/travels", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
