import { agencyInformationsSchema } from '@/schemas/agency/agencyInformations.schemas';
import { agencyService, authService } from '@/services';
import { renderErrorToast } from '@/utils';
import { queryClient } from '@/utils/TanstackQueryProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Agency } from '@reqeefy/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useAgencyUpdateInformations = ({ agency }: { agency: Agency }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof agencyInformationsSchema>>({
    resolver: zodResolver(agencyInformationsSchema),
    defaultValues: {
      activity_area: agency.activity_area,
      description: agency.description || '',
      name: agency.name,
      website_url: agency.website_url || '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['agency', 'update'],
    mutationFn: async (data: z.infer<typeof agencyInformationsSchema>) => {
      return await agencyService.update(agency.id, data);
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success('Vos informations ont bien été mises à jour.');
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
