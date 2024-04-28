import { api } from '@/services';
import { z } from 'zod';
import { loginSchema } from '@/schemas';
import { AxiosError } from 'axios';

const login = async (credentials: z.infer<typeof loginSchema>) => {
  try {
    return await api.post('/auth/signin', credentials);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error('Utilisateur introuvable');
    } else if (axiosError.response?.status === 401) {
      throw new Error('Identifiants incorrects');
    }
  }
};

const logout = async (): Promise<void> => {
  try {
    await api.get('/auth/signout', { withCredentials: true });
  } catch (error) {
    throw new Error('Impossible de se déconnecter');
  }
};

const generateRefreshToken = async () => {
  try {
    return await api.post('/auth/refresh', {}, { withCredentials: true });
  } catch (error) {
    throw new Error('Impossible de rafraîchir le token');
  }
};

const getToken = () => {
  const { state } = JSON.parse(localStorage.getItem('user-storage') || '{}');

  const { access_token } = state;

  if (!access_token) {
    throw new Error('Token introuvable');
  }

  return access_token;
};

export const authService = {
  login,
  logout,
  getToken,
  generateRefreshToken,
};
