import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { agencyService } from '@/services';

export const useGetAgency = () => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['agency'],
    queryFn: async () => {},
    enabled: !!user,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
