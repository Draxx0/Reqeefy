import { createAgentSchema } from '@/schemas';
import { api } from '@/services';
import { z } from 'zod';

const create = async (
  data: z.infer<typeof createAgentSchema>,
  agencyId: string
) => {
  try {
    return api.post(`/agents/agency/${agencyId}`, data);
  } catch (error) {
    throw new Error("Une erreur est survenue lors de la création de l'agent.");
  }
};

export const agentsService = {
  create,
};
