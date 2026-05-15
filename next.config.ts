import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/moov",
        destination: "https://moov-1.vercel.app/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
