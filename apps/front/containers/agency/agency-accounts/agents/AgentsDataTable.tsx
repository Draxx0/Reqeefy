'use client';
import {
  CreateAgentForm,
  DataTable,
  agentsColumns,
} from '@/components/client.index';
import { PageHeader } from '@/components/server.index';
import { useGetAgents } from '@/hooks/user';
import { Agency } from '@reqeefy/types';

export const AgentsDataTable = ({ agency }: { agency: Agency }) => {
  const agents = useGetAgents({ agency });

  console.log('AGENTS', agents);
  return (
    <div className="space-y-4">
      <PageHeader
        title={'Agents'}
        size="small"
        description="Gérez vos agents, ajoutez-en de nouveaux ou modifiez les informations existantes."
      />
      <DataTable
        columns={agentsColumns}
        data={agents}
        isAccessible={{
          value: agency.agency_groups.length > 0,
          message:
            "Vous devez créer un groupe d'agents pour pouvoir ajouter des agents.",
        }}
      >
        <CreateAgentForm agency={agency} />
      </DataTable>
    </div>
  );
};
