'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/services';
import { renderErrorToast } from '@/utils';
import { useAuthStore } from '@/stores';
import { User } from '@reqeefy/types';

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
