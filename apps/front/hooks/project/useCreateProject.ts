'use client';

import { createProjectSchema } from '@/schemas';
import { authService, projectsService } from '@/services';
import { renderErrorToast } from '@/utils';
import { queryClient } from '@/utils/TanstackQueryProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useCreateProject = ({ agencyId }: { agencyId: string }) => {
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
      toast.success('Le projet a été créé avec succès');
      queryClient.invalidateQueries({
        queryKey: ['agency'],
      });
      router.push(`/settings/projects/${data.id}`);
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
