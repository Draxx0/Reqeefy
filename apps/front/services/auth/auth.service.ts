import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from '@/schemas';
import { api } from '@/services';
import { User } from '@reqeefy/types';
import { z } from 'zod';

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

const forgotPassword = async (data: z.infer<typeof forgotPasswordSchema>) => {
  try {
    return await api.post('/auth/forgot-password', data);
  } catch (error) {
    console.error(error);
    throw new Error('Impossible de réinitialiser le mot de passe');
  }
};

const resetPassword = async (
  userId: string,
  token: string,
  data: z.infer<typeof resetPasswordSchema>
) => {
  try {
    return await api.post(`/auth/reset-password/${userId}/${token}`, data);
  } catch (error) {
    // @ts-ignore
    if (error.response?.data.message === 'Token expired') {
      throw new Error('Votre lien de réinitialisation a expiré');
    }

    throw new Error('Impossible de réinitialiser le mot de passe');
  }
};

export const authService = {
  login,
  logout,
  forgotPassword,
  resetPassword,
  getToken,
  generateRefreshToken,
};
