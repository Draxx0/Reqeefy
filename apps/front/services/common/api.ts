import axios from 'axios';
import { authService } from '../auth/auth.service';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    console.error(error);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        return authService.generateRefreshToken().then(() => {
          return api(originalRequest);
        });
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
