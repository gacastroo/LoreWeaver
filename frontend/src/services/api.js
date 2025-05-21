import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/', // Fallback a proxy local
  withCredentials: true,
});


// Interceptor para añadir token JWT desde localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
