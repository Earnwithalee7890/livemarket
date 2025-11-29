import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Empty turbopack config to silence the warning
    // Most apps work fine without additional configuration
  },
};

export default nextConfig;
