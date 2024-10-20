import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { decryptData } from "./helpers";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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
  (response) => {
    // const decryptedData = decryptData(
    //   response.data.encryptedData!,
    //   response.data.iv,
    //   process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
    // );

    // if (!decryptedData) {
    //   console.error("Failed to decrypt response data");
    //   return Promise.reject(new Error("Decryption failed"));
    // }

    // return {
    //   ...response,
    //   data: decryptedData,
    // };

    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
