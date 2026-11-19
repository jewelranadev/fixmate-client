/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Workaround for vercel/next.js#100251: the persistent Turbopack dev
    // cache plus a dev-server restart can trap an open tab in an endless
    // "HMR hash mismatch" reload loop on Next 16.4.x.
    turbopackFileSystemCacheForDev: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
