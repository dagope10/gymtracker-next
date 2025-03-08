import axios from 'axios';

// Definir la URL base según el entorno
const getBaseURL = () => {
  // En el cliente, siempre usa /api que será redirigido por next.config.ts
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default api;