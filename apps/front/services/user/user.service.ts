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
  console.log('data', data);
  try {
    return api.put(`/users/${userId}`, data);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la mise à jour de votre profil.'
    );
  }
};

export const userService = {
  updateUserProfile,
};
