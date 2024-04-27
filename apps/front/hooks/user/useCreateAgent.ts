'use client';

import { createAgentSchema } from '@/schemas';
import { agentsService } from '@/services';
import { renderErrorToast } from '@/utils';
import { queryClient } from '@/utils/TanstackQueryProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateAgent = ({ agencyId }: { agencyId: string }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'agent' as const,
      agency_group_id: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createAgentSchema>) => {
      return await agentsService.create(data, agencyId);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success("L'agent a été ajouté avec succès");
      queryClient.invalidateQueries({
        queryKey: ['agency'],
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
