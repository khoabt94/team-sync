import { AppConfig } from "@shared/configs/app.config";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: AppConfig.VITE_API_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);
