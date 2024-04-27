import { API_PARAMS } from '@/constants';
import { createCustomerSchema } from '@/schemas';
import { authService } from '@/services/auth/auth.service';
import { z } from 'zod';

const create = async (
  data: z.infer<typeof createCustomerSchema>,
  agencyId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers/agency/${agencyId}`,
    API_PARAMS.POST(data, authService.getToken())
  );

  if (!response.ok) {
    throw new Error('Une erreur est survenue lors de la création du client.');
  }

  return response.json();
};

export const customersService = {
  create,
};
