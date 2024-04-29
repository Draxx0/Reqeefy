import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();

  const handleLogOut = async () => {
    await authService.logout();
    router.push('/auth/login');

    setTimeout(() => {
      setAccessToken('');
      setUser(null);

      queryClient.removeQueries();
    }, 2000);
  };

  return {
    handleLogOut,
  };
};
