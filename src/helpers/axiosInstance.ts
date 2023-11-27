import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://161.97.83.162:777",
//   timeout: 10000,
//   headers: { "X-Custom-Header": "foobar" },
// });

export const axiosWithToken = axios.create({
  baseURL: "http://161.97.83.162:777",
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
