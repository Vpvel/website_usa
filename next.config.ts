import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep production builds green even if editors run stricter local lint rules.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
