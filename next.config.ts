import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/workout",
        destination: "https://workout-app-pearl-kappa.vercel.app/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
