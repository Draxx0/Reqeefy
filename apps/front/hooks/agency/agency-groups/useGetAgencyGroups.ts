import { agencyGroupService } from '@/services/agency/agency-group.service';
import { useAuthStore } from '@/stores';
import { Agency } from '@reqeefy/types';
import { useQuery } from '@tanstack/react-query';

export const useGetAgencyGroups = ({ agency }: { agency?: Agency | null }) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['agency', agency?.id, 'groups'],
    queryFn: async () => {
      //! should be improved, this is a temporary fix
      if (!agency) throw new Error('No agency provided');
      return await agencyGroupService.getAll(agency.id);
    },
    enabled: !!user && !!agency,
  });

  return {
    ...query,
  };
};
