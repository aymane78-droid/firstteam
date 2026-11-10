import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Limite Next.js au dossier du projet (évite qu'il surveille tout le dossier personnel)
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
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
