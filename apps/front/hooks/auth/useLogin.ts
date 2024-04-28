'use client';

import { loginSchema } from '@/schemas';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useLogin = () => {
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      return await authService.login(data, '');
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      // const { user, access_token } = data;
      // setUser(user);
      // setAccessToken(access_token);
      const user = data;
      setUser(user);
      router.push('/');
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};
