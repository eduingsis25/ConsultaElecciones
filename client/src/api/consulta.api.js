import axios from "axios";

export const electorApi = axios.create({
  baseURL: "/api/",
});

electorApi.interceptors.request.use(
  (config) => {
    // --- Si usas TokenAuthentication ---
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const consultaCV = (cedula) => {
  return electorApi.get(`elector/${cedula}`);
};

export const registrarCenso = (data) => {
  return electorApi.post("censo/", data);
};
