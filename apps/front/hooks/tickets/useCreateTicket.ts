'use client';
import { STATIC_PATHS } from '@/constants';
import { createTicketSchema } from '@/schemas';
import { ticketsService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateTicket = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      content: '',
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
      toast.success(
        'La discussion a été créé avec succès, votre demande sera bientôt distribuée à notre équipe.'
      );
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'tickets'],
      });
      router.push(`/tickets/${data.id}`);
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
