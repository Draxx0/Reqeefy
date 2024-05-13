import { useQuery } from '@tanstack/react-query';
import { DEFAULT_USE_QUERY_PARAMS } from '@/constants';
import { useAuthStore } from '@/stores';
import { Agency } from '@reqeefy/types';
import { agencyGroupService } from '@/services/agency/agency-group.service';

export const useGetAgencyGroups = ({ agency }: { agency?: Agency | null }) => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['agency', agency?.id, 'groups'],
    queryFn: async () => {
      //! should be improved, this is a temporary fix
      if (!agency) throw new Error('No agency provided');
      return await agencyGroupService.getAll(agency.id);
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user && !!agency,
    ...DEFAULT_USE_QUERY_PARAMS,
  });

  return {
    ...query,
  };
};
