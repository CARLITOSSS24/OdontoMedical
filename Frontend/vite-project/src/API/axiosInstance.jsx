import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor para adjuntar el token en cada petición
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar expiración o invalidez del token
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // El token es inválido o expiró
      localStorage.removeItem("token");
      // Redirige al login (ajusta la ruta si es diferente en tu app)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;