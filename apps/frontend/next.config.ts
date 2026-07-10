import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@review-dash/shared"],
  crossOrigin: "anonymous",
};

export default nextConfig;
