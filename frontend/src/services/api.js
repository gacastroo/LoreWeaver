// src/services/api.js
import axios from 'axios';

// Crear instancia de axios para configurar la base URL
const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto según tu URL de backend
});

// Interceptor para agregar el token en los headers de las solicitudes
API.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si existe, agregarlo en los headers de la solicitud
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error("❌ No se encontró token en localStorage");
    }
    return config;
  },
  (error) => {
    // Si ocurre un error en la solicitud, puedes manejarlo aquí
    return Promise.reject(error);
  }
); 

export default API;

