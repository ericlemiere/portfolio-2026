import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/workout",
        destination: "https://lunar-gravity.vercel.app",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
