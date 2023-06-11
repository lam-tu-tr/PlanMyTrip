/** @type {import('next').NextConfig} */
const nextConfig = {
  //env declare on client side
  env: {
    MAPBOX_KEY: process.env.MAPBOX_API_KEY,
  },
};

module.exports = nextConfig;
