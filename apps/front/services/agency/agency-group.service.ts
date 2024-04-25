import { API_PARAMS } from '@/constants';
import { AgencyGroup } from '@reqeefy/types';
import { authService } from '../auth/auth.service';

const getAll = async (agencyId: string): Promise<AgencyGroup[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agency-groups/agency/${agencyId}`,
    API_PARAMS.GET(authService.getToken())
  );

  if (!response.ok) {
    throw new Error(
      "Une erreur est survenue lors de la récupération de vos groupes d'agence."
    );
  }

  return response.json();
};

export const agencyGroupService = {
  getAll,
};
