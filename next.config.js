const env = process.env.NEXT_PUBLIC_ENV;

const basePath = {
  local: "",
  staging: "/lms-fe",
  production: "",
};

const assetPrefix = {
  local: undefined,
  staging: "/lms-fe/",
  production: undefined,
};

module.exports = {
  distDir: ".next",
  reactStrictMode: true,
  basePath: basePath[env],
  assetPrefix: assetPrefix[env],
};
