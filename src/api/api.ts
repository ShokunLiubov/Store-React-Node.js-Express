import axios, { AxiosResponse } from "axios"

const API_URL = "http://localhost:5001/";

export const $API = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$API.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$API.interceptors.response.use(
  (config: AxiosResponse<any>) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        const response = await axios.get(`${API_URL}auth/refresh`);
        localStorage.setItem("token", response.data.accessToken);
        return $API.request(originalRequest);
      } catch (e) {
        console.log("Not authorization");
      }
    }
    throw error;
  },
);

