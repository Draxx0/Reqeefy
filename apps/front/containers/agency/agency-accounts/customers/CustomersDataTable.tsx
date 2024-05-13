'use client';

import {
  CreateCustomerForm,
  DataTable,
  customersColumns,
} from '@/components/client.index';
import { PageHeader } from '@/components/server.index';
import { useGetCustomers } from '@/hooks/user';
import { Agency } from '@reqeefy/types';

export const CustomersDataTable = ({ agency }: { agency: Agency }) => {
  const customers = useGetCustomers({ agency });
  return (
    <div className="space-y-4">
      <PageHeader
        title={'Clients'}
        size="small"
        description="Gérez les clients de votre agence, ajoutez-en de nouveaux ou modifiez les informations existantes."
      />
      <DataTable
        columns={customersColumns}
        data={customers}
        isAccessible={{
          value: agency.projects.length > 0,
          message:
            'Vous devez créer un projet pour pouvoir ajouter des clients.',
        }}
      >
        <CreateCustomerForm agency={agency} />
      </DataTable>
    </div>
  );
};
