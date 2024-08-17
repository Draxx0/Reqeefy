'use client';

import { UpdateTicketMessage, updateTicketMessageSchema } from '@/schemas';
import { messagesService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useUpdateMessage = ({
  ticketId,
  messageId,
}: {
  ticketId: string;
  messageId: string;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateTicketMessage>({
    resolver: zodResolver(updateTicketMessageSchema),
    defaultValues: {
      content: '',
      // uploadedFiles: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateTicketMessage) => {
      return await messagesService.update(
        {
          content: data.content,
        },
        messageId
      );
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success('Message modifié avec succès');
      form.reset();
      // queryClient.invalidateQueries({
      //   queryKey: ['tickets'],
      // });
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    mutate(formData);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};
