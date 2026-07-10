import axios from "axios";

// Next.js only inlines NEXT_PUBLIC_* when accessed as process.env.NEXT_PUBLIC_…
const apiOrigin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: apiOrigin ? `${apiOrigin}/api` : "/api",
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
