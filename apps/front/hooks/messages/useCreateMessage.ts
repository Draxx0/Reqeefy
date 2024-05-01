'use client';

import { createTicketMessageSchema } from '@/schemas';
import { messagesService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateMessage = ({ ticketId }: { ticketId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(createTicketMessageSchema),
    defaultValues: {
      content: '',
      // upload_files
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createTicketMessageSchema>) => {
      return await messagesService.create(data, ticketId);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success('Message envoyé avec succès');
      form.reset();
      // router.refresh();
      queryClient.invalidateQueries({
        queryKey: ['tickets'],
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
