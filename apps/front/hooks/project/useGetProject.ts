import { projectsService } from '@/services';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';

export const useGetProject = ({ projectId }: { projectId: string }) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      return await projectsService.getOne(projectId);
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user && !!projectId,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
