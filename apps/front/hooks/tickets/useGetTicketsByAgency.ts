import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { ticketsService } from '@/services';
import { TicketsQueryParams } from '@/types';

export const useGetTicketsByAgency = ({
  agencyId,
  queryParams,
}: {
  agencyId: string | undefined;
  queryParams: TicketsQueryParams;
}) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['agency', 'tickets', queryParams.page, queryParams.sort_order],
    queryFn: async () => {
      //! should be improved...
      if (!agencyId) throw new Error('Agency ID is required');
      return await ticketsService.getAllDistributedByAgency(
        agencyId,
        queryParams
      );
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user && !!agencyId,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
