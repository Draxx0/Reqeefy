'use client';

import { CreateAgencyGroupForm } from '@/components/agency';
import { DataTable } from '@/components/common/components/data-table';
import { PageHeader } from '@/components/server.index';
import { GlobalError } from '@/containers/error-state';
import { DataTableSkeleton } from '@/containers/loading-state/common/DataTableSkeleton';
import { useGetAgencyGroups } from '@/hooks';
import { Agency } from '@reqeefy/types';
import { agencyGroupsColumns } from '../../../../components/agency/agency-groups/AgencyGroupsColumns';

export const AgencyGroupsTable = ({ agency }: { agency: Agency }) => {
  const {
    data: agencyGroups,
    isLoading,
    isError,
  } = useGetAgencyGroups({ agency });

  if (isLoading || !agencyGroups) return <DataTableSkeleton />;

  if (isError && !agencyGroups) {
    return <GlobalError />;
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={"Groupes d'agents"}
        size="small"
        description="Gérer les groupes d'agents de votre agence. Pôle communication, commercial, développement, etc."
      />

      <DataTable columns={agencyGroupsColumns} data={agencyGroups}>
        <CreateAgencyGroupForm agency={agency} />
      </DataTable>
    </div>
  );
};
