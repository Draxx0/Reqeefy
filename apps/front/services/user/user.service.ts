import { userSettingsSchema } from '@/schemas';
import { api } from '@/services';
import { User, UserRole } from '@reqeefy/types';
import { z } from 'zod';

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

const updateUserRole = async ({
  role,
  userId,
}: {
  role: Omit<UserRole, 'customer'>;
  userId: string;
}): Promise<User> => {
  try {
    return api.put(`/users/${userId}/role`, { role });
  } catch (error) {
    throw new Error(
      "Une erreur est survenue lors de la mise à jour du rôle de l'agent."
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
  updateUserRole,
  getProfile,
};
