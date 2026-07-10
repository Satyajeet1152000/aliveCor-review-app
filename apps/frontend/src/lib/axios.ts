import { env } from "process";

import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string })?.message ??
        error.message ??
        "Something went wrong";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error instanceof Error ? error : new Error("Something went wrong"));
  },
);
