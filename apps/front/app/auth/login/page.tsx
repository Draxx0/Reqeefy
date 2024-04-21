'use client';import { useAuthStore } from '@/stores';
import { Agent, Customer, UserPreferences } from '@reqeefy/types';
import { useRouter } from 'next/router';

export default function AuthLoginPage() {
  const { setUser } = useAuthStore();

  return (
    <button
      onClick={() => {
        setUser({
          agent: {} as Agent,
          email: '',
          first_name: '',
          last_name: '',
          id: '123',
          avatar: null,
          customer: {} as Customer,
          is_email_confirmed: false,
          preferences: {} as UserPreferences,
        });
        window.location.href = '/';
      }}
    >
      Login
    </button>
  );
}
