'use client';

import { userService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { User } from '@reqeefy/types';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const useGetProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const setStoredUser = useAuthStore((state) => state.setUser);

  const fetchUser = async () => {
    try {
      const fetchedUser = await userService.getProfile();
      setStoredUser(fetchedUser);
      setUser(fetchedUser);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          return renderErrorToast(
            'Vous allez un peu vite en besogne, veuillez patienter quelques instants avant de réessayer'
          );
        }
        renderErrorToast(
          'Une erreur est survenue, veuillez réessayer plus tard'
        );
      }
    }
  };

  return { user, fetchUser };
};
