import axios from "axios";
import { getToken } from "./getToken";
const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.needsAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la solicitud:", error);
    return Promise.reject(new Error("Error en la solicitud a la API"));
  }
);

export default api;
