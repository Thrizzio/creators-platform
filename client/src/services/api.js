import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const apiClient = {
  get: async (url, config = {}) => {
    const response = await api.get(url, config);
    return response.data;
  },
  post: async (url, body, config = {}) => {
    const response = await api.post(url, body, config);
    return response.data;
  },
  put: async (url, body, config = {}) => {
    const response = await api.put(url, body, config);
    return response.data;
  },
  delete: async (url, config = {}) => {
    const response = await api.delete(url, config);
    return response.data;
  },
};

export default apiClient;
