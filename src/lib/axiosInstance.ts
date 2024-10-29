import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { store } from "@/store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const excludedRoutes = [
  "/api/proxy/profile",
  "/api/proxy/files/upload",
  "/auth",
];

axiosInstance.interceptors.request.use(
  async (config) => {
    const profileRequiresUpdate =
      store.getState()?.user?.profile?.requires_update;

    const isExcludedRoute = excludedRoutes.some((route) =>
      config.url?.startsWith(route)
    );
    if (
      profileRequiresUpdate &&
      config.method &&
      config.method.toLowerCase() !== "get" &&
      !isExcludedRoute
    ) {
      return Promise.reject(new Error("Update your profile to proceed"));
    }

    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      signOut();
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
