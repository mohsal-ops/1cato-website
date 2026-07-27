import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Menu/blog/partner image uploads go through server actions; 10mb
      // comfortably covers a high-res photo without leaving the endpoint
      // open to oversized-payload abuse.
      bodySizeLimit: "10mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Rewards + Our Story were removed in the 1Cato rebrand. These pages may
  // already be indexed by Google from the Southern Jerks version — 301 them to
  // the homepage so we don't bleed a wave of 404s during the transition.
  async redirects() {
    return [
      { source: "/rewards", destination: "/", permanent: true },
      { source: "/story", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
