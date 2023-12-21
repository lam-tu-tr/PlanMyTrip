/** @type {import('next').NextConfig} */
const nextConfig = {
  //env declare on client side
  env: {
    MAPBOX_KEY: process.env.MAPBOX_API_KEY,
  },
  basePath: "",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
