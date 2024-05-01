import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { ticketsService } from '@/services';
import { TicketsQueryParams } from '@/types';

export const useGetTickets = ({
  projectId,
  queryParams,
}: {
  projectId: string | undefined;
  queryParams: TicketsQueryParams;
}) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['projects', 'tickets', queryParams.page, queryParams.sort_order],
    queryFn: async () => {
      //! should be improved...
      if (!projectId) throw new Error('Project ID is required');
      return await ticketsService.getAllByProject(projectId, queryParams);
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user && !!projectId,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
