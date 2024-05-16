import { z } from 'zod';
import { userSettingsSchema } from '@/schemas';
import { User } from '@reqeefy/types';
import { api } from '@/services';

const updateUserProfile = async ({
  userId,
  data,
}: {
  userId: string;
  data: z.infer<typeof userSettingsSchema>;
}): Promise<User> => {
  try {
    return api.put(`/users/${userId}`, data);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la mise à jour de votre profil.'
    );
  }
};

const getProfile = async (): Promise<User> => {
  try {
    return api.get(`/auth/status`);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération de vos informations.'
    );
  }
};

export const userService = {
  updateUserProfile,
  getProfile,
};
