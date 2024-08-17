'use client';

import { updateAgencyGroupSchema } from '@/schemas';
import { agencyGroupService } from '@/services';
import { AgencyGroupTableData } from '@/types';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useUpdateAgencyGroup = ({
  agencyGroup,
}: {
  agencyGroup: AgencyGroupTableData;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateAgencyGroupSchema),
    defaultValues: {
      name: agencyGroup.name || '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof updateAgencyGroupSchema>) => {
      return await agencyGroupService.update(data, agencyGroup.id);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success("Le groupe d'agents a été mis à jour avec succès");
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
