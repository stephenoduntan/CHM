import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/our-belief",
        destination: "/our-beliefs",
        permanent: true,
      },
      {
        source: "/cathedral",
        destination: "/next-level-cathedral",
        permanent: true,
      },
      {
        source: "/live",
        destination: "/watch-online",
        permanent: true,
      },
      {
        source: "/management",
        destination: process.env.NEXT_PUBLIC_MANAGEMENT_URL || "https://admin.rccgchm.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
