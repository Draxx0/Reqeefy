'use client';

import { DataTable } from '@/components/common/components/data-table';
import { PageHeader } from '@/components/server.index';
import { useGetAgencyGroups } from '@/hooks';
import { Agency } from '@reqeefy/types';
import { agencyGroupsColumns } from '../../../../components/agency/agency-groups/AgencyGroupsColumns';
import { CreateAgencyGroupForm } from '@/components/agency';

export const AgencyGroupsTable = ({ agency }: { agency: Agency }) => {
  const {
    data: agencyGroups,
    isLoading,
    isError,
  } = useGetAgencyGroups({ agency });

  //! create data table skeleton
  if (isLoading || !agencyGroups) return <div>Loading...</div>;

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
