import axios from "axios";
import loadingManager from "./utils/loadingManager";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Thêm request vào loading manager
  const requestId = `${Date.now()}-${Math.random()}`;
  config.metadata = { requestId };
  loadingManager.addRequest(requestId);

  return config;
});

let refreshPromise = null;
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch {
    return false;
  }
};

instance.interceptors.response.use(
  (response) => {
    // Xóa request khỏi loading manager khi thành công
    if (response.config.metadata?.requestId) {
      loadingManager.removeRequest(response.config.metadata.requestId);
    }
    return response;
  },
  async (error) => {
    // Xóa request khỏi loading manager khi có lỗi
    if (error.config?.metadata?.requestId) {
      loadingManager.removeRequest(error.config.metadata.requestId);
    }

    console.log(error);
    if (error.response?.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken) {
        //Lưu vào localStorage
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        //Gọi lại request bị failed - interceptor request sẽ tự động thêm requestId mới
        return instance(error.config);
      } else {
        //Logout
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
