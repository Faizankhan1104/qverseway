// api/axios.js - WITH ENCRYPTION

import axios from 'axios';
import { decryptData } from '../utils/encryption';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'level-farrah-nexura-6a506cd8.koyeb.app//api',
});

api.interceptors.request.use(
  (config) => {
    // ✅ Get encrypted token and decrypt it
    const encryptedToken = localStorage.getItem('_at');
    if (encryptedToken) {
      const token = decryptData(encryptedToken);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('_at');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;