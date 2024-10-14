import axios from "axios";
import { getSession, signOut } from "next-auth/react";

import { store } from "@/store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let isRedirecting = false;

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;

      setTimeout(() => {
        isRedirecting = false;
      }, 1000);

      signOut();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
