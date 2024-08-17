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
  async function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        return authService.generateRefreshToken().then(() => {
          console.info('Token refreshed');
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
