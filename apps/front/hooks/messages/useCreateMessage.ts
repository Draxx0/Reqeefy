'use client';

import { CreateTicketMessage, createTicketMessageSchema } from '@/schemas';
import { messagesService, uploadFiles } from '@/services';
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

  const form = useForm<CreateTicketMessage>({
    resolver: zodResolver(createTicketMessageSchema),
    defaultValues: {
      content: '',
      uploadedFiles: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateTicketMessage) => {
      return await messagesService.create(
        {
          content: data.content,
          uploadedFiles: data.uploadedFiles,
        },
        ticketId
      );
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success('Message envoyé avec succès');
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ['tickets'],
      });
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const filesToUpload = formData.uploadedFiles;

    if (filesToUpload && filesToUpload.length > 0) {
      try {
        const uploadResults = await uploadFiles(
          filesToUpload,
          'attached-files'
        );
        form.setValue('uploadedFiles', uploadResults as any);
      } catch (error) {
        renderErrorToast('Erreur lors du téléchargement des fichiers');
        return;
      }
    }

    const updatedFormData = form.getValues();

    mutate(updatedFormData);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};
