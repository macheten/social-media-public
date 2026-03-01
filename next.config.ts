import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      new URL('https://entih8fu65opczku.public.blob.vercel-storage.com/**')
    ],
  }
};

export default nextConfig;
