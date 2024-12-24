import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },

};

export default nextConfig;
