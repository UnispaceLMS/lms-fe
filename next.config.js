/** @type {import('next').NextConfig} */

const assetPrefix = {
  local: undefined,
  staging: "https://unispacelms.github.io/lms-fe",
  production: undefined,
};

const nextConfig = {
  basePath: "",
  distDir: ".next",
  reactStrictMode: true,
  assetPrefix: assetPrefix[process.env.NEXT_PUBLIC_ENV],
};

module.exports = nextConfig;
