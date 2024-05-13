import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { ticketsService } from '@/services';

export const useGetTicket = ({ ticketId }: { ticketId: string }) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['tickets', ticketId],
    queryFn: async () => {
      return await ticketsService.getOne(ticketId);
    },
    enabled: !!user && !!ticketId,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
