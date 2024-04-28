'use client';

import { userSettingsSchema } from '@/schemas';
import { authService, userService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useUserSettings = () => {
  const { user, setUser, setAccessToken } = useAuthStore();
  const router = useRouter();

  if (!user) {
    throw new Error('User not found');
  }

  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof userSettingsSchema>) => {
      return await userService.updateUserProfile({
        userId: user.id,
        data,
      });
    },
    onError: (error) => {
      console.error('ERROR', error);

      renderErrorToast(error.message);
    },
    onSuccess({ access_token, user }, variables, context) {
      setUser(user);
      setAccessToken(access_token);

      toast.success('Profil mis à jour', {
        duration: 5000,
      });

      router.refresh();
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
