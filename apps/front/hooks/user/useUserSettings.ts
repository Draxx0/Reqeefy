'use client';
import { userSettingsSchema } from '@/schemas';
import { userService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useUserSettings = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof userSettingsSchema>) => {
      if (!user) return null;
      return await userService.updateUserProfile({
        userId: user.id,
        data,
      });
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      setUser(data);

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
