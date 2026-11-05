import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
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
    ];
  },
};

export default nextConfig;
