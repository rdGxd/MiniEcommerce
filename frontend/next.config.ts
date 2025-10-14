import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Forçar CSR (Client-Side Rendering)
  output: "export",
  trailingSlash: true,
  images: {
    domains: ["picsum.photos"],
    unoptimized: true, // Necessário para export estático
  },

};

export default nextConfig;
