import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/digital-rock-collection",
        destination: "/rock-sweeper",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
