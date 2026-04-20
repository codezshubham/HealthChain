import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Use the monorepo root (where node_modules lives) so Turbopack can
    // resolve packages like `next` even when the project directory is `client`.
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
