'use client';

import { userService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { User } from '@reqeefy/types';
import { useState } from 'react';

export const useGetProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const setStoredUser = useAuthStore((state) => state.setUser);

  const fetchUser = async () => {
    try {
      const fetchedUser = await userService.getProfile();
      console.log('getting user', fetchedUser);
      setStoredUser(fetchedUser);
      setUser(fetchedUser);
    } catch (error) {
      if (error instanceof Error) {
        renderErrorToast(error.message);
      }
    }
  };

  return { user, fetchUser };
};
