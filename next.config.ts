import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["knex", "pg", "bcryptjs"],
};

export default nextConfig;
