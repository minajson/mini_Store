
import axios from "axios";
import appconfig from "../config/appConfig";

const apiClient = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
  
  }
  return config;

});

export default apiClient;