import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    scrollRestoration: true,
    typedRoutes: true,
    typedEnv: true,
  },
  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
