import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api", 
});

// Interceptor: agrega el token JWT automáticamente en cada petición
api.interceptors.request.use((config) => {
const token = localStorage.getItem("token");
if (token) {
    config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

// Interceptor: si el servidor responde 401, limpiar sesión

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirige al login
        }
        return Promise.reject(error);
    }
);

export default api;
