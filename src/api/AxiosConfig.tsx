import axios from "axios";

const backendUrl = import.meta.env.VITE_BACK_END_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Set withCredentials to true to send cookies or authorization headers by default
});

// Uncomment and customize the request interceptor if you need to add authorization tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
