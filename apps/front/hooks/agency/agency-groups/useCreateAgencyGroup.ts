'use client';

import { createAgencyGroupSchema } from '@/schemas';
import { agencyGroupService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateAgencyGroup = ({ agencyId }: { agencyId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createAgencyGroupSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createAgencyGroupSchema>) => {
      return await agencyGroupService.create(data, agencyId);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success("Le groupe d'agents a été ajouté avec succès.");
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
