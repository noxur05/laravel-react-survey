import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};

  config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;

  return config;
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('TOKEN')
    window.location.reload()
    return error;
  }
  throw error;
});

export default axiosClient;