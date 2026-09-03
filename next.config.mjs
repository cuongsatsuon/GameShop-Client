/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this app (repo has multiple lockfiles).
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "www.vieblox.net" },
      // admin can set a custom product image from any https host (vieblox content override)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
