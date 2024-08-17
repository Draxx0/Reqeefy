'use client';
import { resetPasswordSchema } from '@/schemas';
import { authService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useResetPassword = ({
  userId,
  resetToken,
}: {
  userId: string;
  resetToken: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof resetPasswordSchema>) => {
      return await authService.resetPassword(userId, resetToken, data);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success(
        'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.'
      );
      router.push('/auth/login');
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
