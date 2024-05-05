import { useQuery } from '@tanstack/react-query';import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { Agency } from '@reqeefy/types';
import { projectsService } from '@/services';
import { ProjectsQueryParams } from '@/types';

export const useGetProjects = ({
  agency,
  queryParams,
}: {
  agency: Agency;
  queryParams: ProjectsQueryParams;
}) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: [
      'agency',
      agency.id,
      'projects',
      queryParams.page,
      queryParams.sort_order,
      queryParams.search,
    ],
    queryFn: async () => {
      return await projectsService.getAll(agency.id, queryParams);
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user && !!agency,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
