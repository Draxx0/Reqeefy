'use client';

import { STATIC_PATHS } from '@/constants';
import { createProjectSchema } from '@/schemas';
import { projectsService } from '@/services';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateProject = ({ agencyId }: { agencyId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      agents_referents_ids: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createProjectSchema>) => {
      return await projectsService.create(data, agencyId);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success('Le projet a été créé avec succès');
      queryClient.invalidateQueries({
        queryKey: ['agency'],
      });
      router.push(`${STATIC_PATHS.PROJECTS_SETTINGS}/${data.id}`);
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
