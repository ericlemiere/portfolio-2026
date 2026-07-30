import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/moov",
        destination: "https://www.moov28.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
