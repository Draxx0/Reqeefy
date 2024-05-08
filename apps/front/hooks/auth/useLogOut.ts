'use client';

import { STATIC_PATHS } from '@/constants';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogOut = async () => {
    await authService.logout();
    router.push(STATIC_PATHS.LOGIN);

    setTimeout(() => {
      setUser(null);

      queryClient.removeQueries();
    }, 2000);
  };

  return {
    handleLogOut,
  };
};
