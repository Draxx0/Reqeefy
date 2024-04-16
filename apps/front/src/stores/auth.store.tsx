import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@reqeefy/types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  access_token: string | null;
  setAccessToken: (access_token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set(() => ({ user })),
      access_token: null,
      setAccessToken: (access_token: string | null) =>
        set(() => ({ access_token })),
    }),
    {
      name: 'user-storage',
    }
  )
);
