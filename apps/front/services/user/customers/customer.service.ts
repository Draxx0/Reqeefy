import { createCustomerSchema } from '@/schemas';
import { api } from '@/services';
import { z } from 'zod';

const create = async (
  data: z.infer<typeof createCustomerSchema>,
  agencyId: string
) => {
  try {
    return api.post(`/customers/agency/${agencyId}`, data);
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la création du client.');
  }
};

export const customersService = {
  create,
};
