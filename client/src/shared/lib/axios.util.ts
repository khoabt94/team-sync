import axios from "axios";

import { AppConfig } from "@shared/configs/app.config";

export const axiosClient = axios.create({
  baseURL: AppConfig.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { status } = error.response;
    if (status === 401) {
      //logout first
      window.location.href = "/login";
      return;
    }
    return Promise.reject(error.response.data);
  },
);
