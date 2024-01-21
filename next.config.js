import bundleAnalyzer from "@next/bundle-analyzer";

await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  eslint: { ignoreDuringBuilds: process.env.NODE_ENV !== "production" },
  typescript: { ignoreBuildErrors: process.env.NODE_ENV !== "production" },
};

const plugins = [
  bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
];

export default plugins.reduce((acc, next) => next(acc), config);