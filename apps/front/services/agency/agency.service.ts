import { API_PARAMS } from '@/constants';
import { createAgencyCredentials } from '@/types/agency';
import { authService } from '../auth/auth.service';

const create = async (data: createAgencyCredentials) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agencies`,
    API_PARAMS.POST(data, authService.getToken())
  );

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de la création de votre agence.'
    );
  }

  return response.json();
};

const get = async (agencyId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agencies/${agencyId}`,
    API_PARAMS.GET(authService.getToken())
  );

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de la récupération de votre agence.'
    );
  }

  return response.json();
};

export const agencyService = {
  create,
  get,
};
