import { createAgencyGroupSchema, updateAgencyGroupSchema } from '@/schemas';
import { api } from '@/services';
import { AgencyGroup } from '@reqeefy/types';
import { z } from 'zod';

const getAll = async (agencyId: string): Promise<AgencyGroup[]> => {
  try {
    return await api.get(`/agency-groups/agency/${agencyId}`);
  } catch (error) {
    throw new Error(
      "Une erreur est survenue lors de la récupération des groupes d'agence."
    );
  }
};

const create = async (
  data: z.infer<typeof createAgencyGroupSchema>,
  agencyId: string
): Promise<AgencyGroup> => {
  try {
    return await api.post(`/agency-groups/agency/${agencyId}`, data);
  } catch (error) {
    throw new Error(
      "Une erreur est survenue lors de la création du groupe d'agence."
    );
  }
};

const update = async (
  data: z.infer<typeof updateAgencyGroupSchema>,
  agencyGroupId: string
): Promise<AgencyGroup> => {
  try {
    return await api.put(`/agency-groups/${agencyGroupId}`, data);
  } catch (error) {
    throw new Error(
      "Une erreur est survenue lors de la mise à jour du groupe d'agence."
    );
  }
};

export const agencyGroupService = {
  getAll,
  create,
  update,
};
