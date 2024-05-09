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
      console.log(data.uploadedFiles);
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
      console.log('There is', filesToUpload.length, 'files to upload');
      try {
        const uploadResults = await uploadFiles(
          filesToUpload,
          'attached-files'
        );
        console.log('uploadResults', uploadResults);
        form.setValue('uploadedFiles', uploadResults as any);
        console.log('form values after set uploadResults', form.getValues());
      } catch (error) {
        renderErrorToast('Erreur lors du téléchargement des fichiers');
        return;
      }
    }

    // Assurez-vous que le state local du formulaire est à jour avant de procéder
    const updatedFormData = form.getValues();
    console.log('data to send', updatedFormData);

    mutate(updatedFormData);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};
