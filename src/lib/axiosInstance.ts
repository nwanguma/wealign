import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      // config.headers.Authorization = `Bearer ${session.accessToken}`;

      config.headers.Authorization =
        "Bearer" +
        " " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWZiYjk4Yi1hMzZlLTQ0YmUtYjM4MC00YmM4NWZkNTJjNmEiLCJlbWFpbCI6ImtheW9kZW90aXRvanVtaUB5b3BtYWlsLmNvbSIsImlhdCI6MTcyNjY3MTQ1NSwiZXhwIjoxNzI2Njc1MDU1fQ.yPscVib62q1PXndjcsDtD9gOdfzTkZExMiYoZTMecN0";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
