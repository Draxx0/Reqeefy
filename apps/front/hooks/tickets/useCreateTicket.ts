'use client';

import { createProjectSchema, createTicketSchema } from '@/schemas';
import { authService, projectsService, ticketsService } from '@/services';
import { renderErrorToast } from '@/utils';
import { queryClient } from '@/utils/TanstackQueryProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateTicket = ({ projectId }: { projectId: string }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      message: 'Default message test',
      // upload_files
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createTicketSchema>) => {
      return await ticketsService.create(data, projectId);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success('La discussion a été créé avec succès');
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'tickets'],
      });
      // router.push(`/tickets/${data.id}`);
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
