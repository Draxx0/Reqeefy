import { projectsService } from '@/services';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';

export const useGetProject = ({ projectId }: { projectId: string }) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      return await projectsService.getOne(projectId);
    },
    enabled: !!user && !!projectId,
  });

  return {
    ...query,
  };
};
