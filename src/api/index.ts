import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:8000";

// Regular instance with application/json content type
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Instance with FormData support and Authorization header
export const privateApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add an interceptor to include Authorization header for privateApi requests
privateApi.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    if (accessToken) {
      // @ts-ignore
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function registerUser(data: any) {
  try {
    const res = await publicApi.post("/users/register", data);
    return res.data;
  } catch (e) {
    throw e;
  }
}
