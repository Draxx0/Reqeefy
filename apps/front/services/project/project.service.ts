import { API_PARAMS } from '@/constants';
import { PaginatedData, Project } from '@reqeefy/types';
import { authService } from '../auth/auth.service';
import { ProjectsQueryParams } from '@/types';
import { z } from 'zod';
import { createProjectSchema } from '@/schemas';
import { buildUrlWithQueryParams } from '@/utils';

const getAll = async (
  agencyId: string,
  queryParams: ProjectsQueryParams
): Promise<PaginatedData<Project>> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/agency/${agencyId}`;
  const url = buildUrlWithQueryParams(apiUrl, queryParams);

  const response = await fetch(url, API_PARAMS.GET(authService.getToken()));

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de la récupération de vos projets.'
    );
  }

  return response.json();
};

const getOne = async (projectId: string): Promise<Project> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}`,
    API_PARAMS.GET(authService.getToken())
  );

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de la récupération du projet.'
    );
  }

  return response.json();
};

const create = async (
  data: z.infer<typeof createProjectSchema>,
  agencyId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/agency/${agencyId}`,
    API_PARAMS.POST(data, authService.getToken())
  );

  if (!response.ok) {
    throw new Error('Une erreur est survenue lors de la création du projet.');
  }

  return response.json();
};

export const projectsService = {
  getAll,
  getOne,
  create,
};
