'use client';

import { distributeTicketSchema } from '@/schemas';
import { ticketsService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useDistributeTicket = ({ ticketId }: { ticketId: string }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(distributeTicketSchema),
    mode: 'onChange',
    defaultValues: {
      agent_groups_ids: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof distributeTicketSchema>) => {
      return await ticketsService.distribute(data, ticketId);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success('La discussion a été distribué avec succès');
      queryClient.invalidateQueries({
        queryKey: ['agency'],
      });
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
