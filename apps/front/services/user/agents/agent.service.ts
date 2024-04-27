import { API_PARAMS } from '@/constants';
import { createAgentSchema } from '@/schemas';
import { authService } from '@/services/auth/auth.service';
import { z } from 'zod';

const create = async (
  data: z.infer<typeof createAgentSchema>,
  agencyId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agents/agency/${agencyId}`,
    API_PARAMS.POST(data, authService.getToken())
  );

  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la création de l'agent.");
  }

  return response.json();
};

export const agentsService = {
  create,
};
