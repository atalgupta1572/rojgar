import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL/api0 || 'http://localhost:7007/api';

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