import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/cities",
        destination: "https://finalprojectbackend-production-9a18.up.railway.app/api/v1/cities",
      },
      {
        source: "/api/locations",
        destination: "https://finalprojectbackend-production-9a18.up.railway.app/api/v1/locations/",
      },
    ];
  },
};

export default nextConfig;
