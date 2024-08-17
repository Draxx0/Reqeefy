'use client';

import { userAgentRoleSchema } from '@/schemas/user/user.schemas';
import { userService } from '@/services';
import { AgencyAgentTableData } from '@/types';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useUpdateUserAgentRole = ({
  agent,
}: {
  agent: AgencyAgentTableData;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(userAgentRoleSchema),
    defaultValues: {
      role: agent.role || '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof userAgentRoleSchema>) => {
      return await userService.updateUserRole({
        role: data.role,
        userId: agent.id,
      });
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success("Le rôle de l'agent a été modifié avec succès.");
      queryClient.invalidateQueries({
        queryKey: ['agency'],
      });
      router.refresh();
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // @ts-ignore
    mutate(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};
