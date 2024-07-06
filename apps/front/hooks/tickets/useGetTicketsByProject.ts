import { ticketsService } from '@/services';
import { useAuthStore } from '@/stores';
import { TicketsQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetTicketsByProject = ({
  projectId,
  queryParams,
}: {
  projectId: string | undefined;
  queryParams: TicketsQueryParams;
}) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: [
      'projects',
      projectId,
      'tickets',
      queryParams.page,
      queryParams.sort_order,
      queryParams.search,
    ],
    queryFn: async () => {
      if (!projectId) throw new Error('Project ID is required');
      return await ticketsService.getAllByProject(projectId, queryParams);
    },
    enabled: !!user && !!projectId,
  });

  return {
    ...query,
  };
};
