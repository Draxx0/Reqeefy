import { projectsService } from '@/services';
import { useAuthStore } from '@/stores';
import { ProjectsQueryParams } from '@/types';
import { Agency } from '@reqeefy/types';
import { useQuery } from '@tanstack/react-query';

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
    enabled: !!user && !!agency,
  });

  return {
    ...query,
  };
};
