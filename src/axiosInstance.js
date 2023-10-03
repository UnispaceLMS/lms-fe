import axios from "axios";

// Default Headers which needs to be sent in all requests.
const defaultHeaders = {
  common: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Axios Default configurations
const defaultConfig = {
  timeout: 30000,
  // transformRequest: [transformAxiosRequest],
  headers: { ...defaultHeaders.common },
};

const axiosInstance = axios.create({ ...defaultConfig });

export default axiosInstance;
