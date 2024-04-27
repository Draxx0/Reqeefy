import { PaginatedData, Ticket } from '@reqeefy/types';
import { authService } from '../auth/auth.service';
import { API_PARAMS } from '@/constants';
import { TicketsQueryParams } from '@/types';
import { buildUrlWithQueryParams } from '@/utils';

const getAll = async (
  projectId: string,
  queryParams: TicketsQueryParams
): Promise<PaginatedData<Ticket>> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/project/${projectId}`;
  const url = buildUrlWithQueryParams(apiUrl, queryParams);

  const response = await fetch(url, API_PARAMS.GET(authService.getToken()));

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de la récupération de vos tickets.'
    );
  }

  return response.json();
};

export const ticketsService = {
  getAll,
};
