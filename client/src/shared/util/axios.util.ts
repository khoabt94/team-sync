import axios from "axios";

import { AppConfig } from "@shared/configs/app.config";
import { ErrorCodeEnum } from "@shared/enums/error-code.enum";

export const axiosClient = axios.create({
  baseURL: AppConfig.VITE_API_URL,
  withCredentials: true,
  timeout: 2000,
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.errorCode === ErrorCodeEnum.ACCESS_UNAUTHORIZED) {
      window.location.href = "/";
      return;
    }
    if (error.code === "ERR_NETWORK") {
      return Promise.reject({ message: "Network error" });
    }
    return Promise.reject(error.response.data);
  },
);
