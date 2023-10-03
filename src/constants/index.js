const env = process.env.NEXT_PUBLIC_ENV;
export const apiURL = process.env.NEXT_PUBLIC_API_URL;

const assetPrefixes = {
  local: "",
  staging: "/lms-fe/",
  production: "",
};
export const assetPrefix = assetPrefixes[env];
