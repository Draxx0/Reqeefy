'use client';import { registerSchema } from '@/schemas';
import { agencyService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useSignup = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      email: undefined,
      first_name: undefined,
      last_name: undefined,
      password: undefined,
      website_url: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      return await agencyService.create(data);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      setUser(data);
      toast(`${`Bienvenue sur Reqeefy ${data.first_name} 👋`.toUpperCase()}`, {
        closeButton: true,
        description:
          'Vous avez désormais accès à votre espace personnel, commencez par créer le compte de vos agents ou encore créer votre premier projet client !',
        classNames: {
          toast: 'border-primary-700 border-2 flex flex-col',
        },
        style: {
          gap: '1rem',
        },
      });
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
