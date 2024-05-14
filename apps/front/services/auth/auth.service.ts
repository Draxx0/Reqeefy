import { api } from '@/services';
import { z } from 'zod';
import { loginSchema } from '@/schemas';
import { User } from '@reqeefy/types';

const login = async (
  credentials: z.infer<typeof loginSchema>
): Promise<User> => {
  try {
    return await api.post('/auth/signin', credentials);
  } catch (error) {
    console.error(error);
    throw new Error('Identifiants incorrects');
  }
};

const logout = async (): Promise<void> => {
  try {
    await api.get('/auth/signout');
  } catch (error) {
    throw new Error('Impossible de se déconnecter');
  }
};

const generateRefreshToken = async () => {
  try {
    return await api.post('/auth/refresh');
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
