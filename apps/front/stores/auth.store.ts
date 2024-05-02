import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@reqeefy/types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set(() => ({ user })),
    }),
    {
      name: 'user-storage',
    }
  )
);
