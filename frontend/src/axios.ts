import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import router from './router';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = '1234'; //TODO
    
    config.headers = config.headers || {};
    
    // Set the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
});

axiosClient.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        router.navigate('/login');
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default axiosClient;