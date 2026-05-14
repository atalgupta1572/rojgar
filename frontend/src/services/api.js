import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('Environment variable VITE_API_BASE_URL:', BASE_URL);

const API_BASE_URL = BASE_URL ? `${BASE_URL}/api` : 'http://localhost:5000/api';

console.log('api base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;