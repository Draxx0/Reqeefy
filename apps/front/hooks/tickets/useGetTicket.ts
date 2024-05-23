import { ticketsService } from '@/services';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';

export const useGetTicket = ({ ticketId }: { ticketId: string }) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['tickets', ticketId],
    queryFn: async () => {
      return await ticketsService.getOne(ticketId);
    },
    enabled: !!user && !!ticketId,
  });

  return {
    ...query,
  };
};
