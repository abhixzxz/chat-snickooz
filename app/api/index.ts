import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;


export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token and sync with cookies
api.interceptors.request.use(
  (config) => {
    const userStorage = localStorage.getItem('user-storage');
    if (userStorage) {
      const { state } = JSON.parse(userStorage);
      if (state.token) {
        // Set the token in cookies for middleware authentication
        document.cookie = `token=${state.token}; path=/`;
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    } else {
      // Clear the token cookie if no token in localStorage
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const errorData = error.response?.data as { status: string; message: string };
    const message = errorData?.message || error.message;
    toast.error(message);
    return Promise.reject(new Error(message));
  }
);