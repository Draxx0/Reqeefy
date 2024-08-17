import { createAgentSchema, updateAgentAgencyGroupSchema } from '@/schemas';
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

const updateAgencyGroup = async ({
  data,
  agentId,
}: {
  data: z.infer<typeof updateAgentAgencyGroupSchema>;
  agentId: string;
}) => {
  try {
    return api.put(`/agents/${agentId}/agency-group`, data);
  } catch (error) {
    throw new Error(
      "Une erreur est survenue lors de la mise à jour du groupe de l'agent."
    );
  }
};

export const agentsService = {
  create,
  updateAgencyGroup,
};
