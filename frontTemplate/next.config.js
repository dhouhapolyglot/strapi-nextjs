/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost:1337"],
    deviceSizes: [320, 640, 768, 1024, 1280],
  },
};

module.exports = nextConfig;