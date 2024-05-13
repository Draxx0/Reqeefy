import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { ticketsService } from '@/services';
import { TicketsQueryParams } from '@/types';

export const useGetDistributionTickets = ({
  agencyId,
  queryParams,
}: {
  agencyId: string;
  queryParams: TicketsQueryParams;
}) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: [
      'distribution',
      agencyId,
      'tickets',
      queryParams.page,
      queryParams.sort_order,
    ],
    queryFn: async () => {
      return await ticketsService.getAllToDistributeByAgency(
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
