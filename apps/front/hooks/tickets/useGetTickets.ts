import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { Agency } from '@reqeefy/types';
import { projectsService, ticketsService } from '@/services';
import { TicketsQueryParams } from '@/types';

export const useGetTickets = ({
  projectId,
  queryParams,
}: {
  projectId: string;
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
    ],
    queryFn: async () => {
      return await ticketsService.getAll(projectId, queryParams);
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user && !!projectId,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
