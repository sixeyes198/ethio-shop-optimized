import axios from "axios";
<<<<<<< HEAD
const isLocalhost = window.location.hostname === "localhost" 
const axiosInstance = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:5000"
    : "https://ethio-shop-backend.onrender.com",
=======

const axiosInstance = axios.create({
  baseURL: "https://ethio-shop-b0zq.onrender.com" || "http://localhost:5000",
>>>>>>> fc7f85c69e9c25f7b23231e1a4062592eb136fdb
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
