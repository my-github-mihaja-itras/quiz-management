/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || "/api",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: [process.env.API_BASE_URL || "/api"],
  },
};

module.exports = nextConfig;
