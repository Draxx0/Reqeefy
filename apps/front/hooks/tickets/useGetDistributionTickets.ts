import { ticketsService } from '@/services';
import { useAuthStore } from '@/stores';
import { TicketsQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

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
      'agency',
      agencyId,
      'distribution',
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
    enabled: !!user && !!agencyId,
  });

  return {
    ...query,
  };
};
