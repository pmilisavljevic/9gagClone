import axios from "axios";

import { URL } from "src/helpers/constantsAndEnums";

export const axiosWithToken = axios.create({
  baseURL: URL,
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
