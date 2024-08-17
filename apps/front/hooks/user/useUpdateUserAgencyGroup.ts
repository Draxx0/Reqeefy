'use client';

import { updateAgentAgencyGroupSchema } from '@/schemas';
import { agentsService } from '@/services';
import { AgencyAgentTableData } from '@/types';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useUpdateUserAgentAgencyGroup = ({
  agent,
}: {
  agent: AgencyAgentTableData;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateAgentAgencyGroupSchema),
    defaultValues: {
      agency_group_id: agent.group?.id || '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof updateAgentAgencyGroupSchema>) => {
      return await agentsService.updateAgencyGroup({
        data,
        agentId: agent.agentSelfData.id,
      });
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      form.reset();
      toast.success("Le groupe de l'agent a été mis à jour avec succès.");
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
