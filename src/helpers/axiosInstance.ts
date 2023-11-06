import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://161.97.83.162:777",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
