import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000, // 80 sec timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 📌 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized → redirect to login
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Internal Server Error, Please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
