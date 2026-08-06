import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
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
