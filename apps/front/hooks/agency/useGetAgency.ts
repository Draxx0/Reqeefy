import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { agencyService } from '@/services';

export const useGetAgency = () => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['agency'],
    queryFn: async () => {
      if (!user?.agency) return null;

      return await agencyService.get(user.agency.id);
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
