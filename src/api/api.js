import axios from "axios";

export const APIurl = "http://localhost:5001/";

export const $API = axios.create({
  withCredentials: true,
  baseURL: APIurl,
});

$API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$API.interceptors.response.use(
  (config) => {
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
        const response = await axios.get(`${APIurl}auth/refresh`);
        localStorage.setItem("token", response.data.accessToken);
        return $API.request(originalRequest);
      } catch (e) {
        console.log("Not authorization");
      }
    }
    throw error;
  },
);

export const orderAPI = {
  getOrders() {
    return $API.get("orders").then((response) => response.data);
  },
};

export const customerAPI = {
  getCustomer() {
    return $API.get("customers").then((response) => response.data);
  },
};
