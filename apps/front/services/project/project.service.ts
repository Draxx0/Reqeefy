import { PaginatedData, Project } from '@reqeefy/types';
import { ProjectsQueryParams } from '@/types';
import { z } from 'zod';
import { createProjectSchema } from '@/schemas';
import { buildUrlWithQueryParams } from '@/utils';
import { api } from '@/services';

const getAll = async (
  agencyId: string,
  queryParams: ProjectsQueryParams
): Promise<PaginatedData<Project>> => {
  const apiUrl = `/projects/agency/${agencyId}`;
  const url = buildUrlWithQueryParams(apiUrl, queryParams);

  try {
    return await api.get(url);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération des projets.'
    );
  }
};

const getOne = async (projectId: string): Promise<Project> => {
  try {
    return await api.get(`/projects/${projectId}`);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération du projet.'
    );
  }
};

const create = async (
  data: z.infer<typeof createProjectSchema>,
  agencyId: string
) => {
  try {
    return await api.post(`/projects/agency/${agencyId}`, data);
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la création du projet.');
  }
};

export const projectsService = {
  getAll,
  getOne,
  create,
};
