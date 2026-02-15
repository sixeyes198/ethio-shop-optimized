import axios from "axios";
const isLocalhost = window.location.hostname === "localhost" 
const axiosInstance = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:5000/api"
    : "https://ethio-shop-backend.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
