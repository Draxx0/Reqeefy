import { useAuthStore } from '@/stores';
import { queryClient } from '@/utils/TanstackQueryProvider';
import { useRouter } from 'next/navigation';

export const useLogOut = () => {
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();

  const handleLogOut = async () => {
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
