import { Agency, User } from '@reqeefy/types';import { agencyInformationsSchema } from '@/schemas/agency/agencyInformations.schemas';
import { z } from 'zod';
import { registerSchema } from '@/schemas';
import { api } from '@/services';

const create = async (data: z.infer<typeof registerSchema>): Promise<User> => {
  try {
    return await api.post('/agencies', data);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la création de votre agence.'
    );
  }
};

const get = async (agencyId: string): Promise<Agency> => {
  try {
    return await api.get(`/agencies/${agencyId}`);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération de votre agence.'
    );
  }
};

const update = async (
  agencyId: string,
  data: z.infer<typeof agencyInformationsSchema>
) => {
  try {
    return await api.put(`/agencies/${agencyId}`, data);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la mise à jour de votre agence.'
    );
  }
};

export const agencyService = {
  create,
  get,
  update,
};
