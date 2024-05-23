import { ticketsService } from '@/services';
import { useAuthStore } from '@/stores';
import { TicketsQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

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
    enabled: !!user && !!agencyId,
  });

  return {
    ...query,
  };
};
