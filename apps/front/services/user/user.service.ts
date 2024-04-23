import { z } from 'zod';
import { userSettingsSchema } from '@/schemas';
import { API_BASE_URL, API_PARAMS } from '@/constants';
import { TokenObject } from '@reqeefy/types';

const updateUserProfile = async ({
  userId,
  data,
  token,
}: {
  userId: string;
  data: z.infer<typeof userSettingsSchema>;
  token: string;
}): Promise<TokenObject> => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}`,
    API_PARAMS.PUT(data, token)
  );

  if (!response.ok) {
    throw new Error('Une erreur est survenue lors de la mise à jour du profil');
  }

  return response.json();
};

export const userService = {
  updateUserProfile,
};
