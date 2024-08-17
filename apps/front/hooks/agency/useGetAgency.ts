'use client';
import { agencyService } from '@/services';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';

export const useGetAgency = () => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['agency'],
    queryFn: async () => {
      if (!user?.agency) return null;

      return await agencyService.get(user.agency.id);
    },
    enabled: !!user,
  });

  return {
    ...query,
  };
};
