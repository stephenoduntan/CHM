import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        leadername: "images.unsplash.com",
      },
      {
        protocol: "https",
        leadername: "cdn.sanity.io",
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
