/** @type {import('next').NextConfig} */

const basePath = {
  local: "",
  staging: "/lms-fe",
  production: "",
};

const assetPrefix = {
  local: undefined,
  staging: "https://unispacelms.github.io/lms-fe",
  production: undefined,
};

const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  basePath: basePath[process.env.NEXT_PUBLIC_ENV],
  assetPrefix: assetPrefix[process.env.NEXT_PUBLIC_ENV],
};

module.exports = nextConfig;
