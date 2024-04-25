import { API_PARAMS } from '@/constants';
import { PaginatedData, Project } from '@reqeefy/types';
import { authService } from '../auth/auth.service';
import { ProjectQueryParams } from '@/types';

const getAll = async (
  agencyId: string,
  queryParams: ProjectQueryParams
): Promise<PaginatedData<Project>> => {
  const { limit_per_page, page, search, sort_by, sort_order } = queryParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/agency/${agencyId}?limit_per_page=${limit_per_page}&page=${page}&search=${search}&sort_by=${sort_by}&sort_order=${sort_order}`,
    API_PARAMS.GET(authService.getToken())
  );

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de la récupération de vos projets.'
    );
  }

  return response.json();
};

export const projectsService = {
  getAll,
};
