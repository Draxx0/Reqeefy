'use client';

import { Agency } from '@reqeefy/types';
import { PageHeader } from '../../server.index';
import { DataTable } from './customers/data-table';
import { columns } from './customers/columns';
import { useMemo } from 'react';

export const AgencySettingsAccountContent = ({
  agency,
}: {
  agency: Agency;
}) => {
  const customers = useMemo(() => {
    const customers = agency.users.filter((user) => user.role === 'customer');

    return customers.map((userAsCustomer) => ({
      id: userAsCustomer.id,
      first_name: userAsCustomer.first_name,
      last_name: userAsCustomer.last_name,
      email: userAsCustomer.email,
      project: userAsCustomer.customer?.projects[0]?.name || 'Aucun projet',
    }));
  }, [agency.users]);

  return (
    <div className="space-y-12">
      <PageHeader
        title={'Paramètres du compte'}
        size="small"
        description="Gérez les comptes relatifs à votre agence, tels que vos agents et vos clients."
        hasSeparator
      />

      <div className="space-y-4">
        <PageHeader
          title={'Clients'}
          size="small"
          description="Gérez les clients de votre agence, ajoutez-en de nouveaux ou modifiez les informations existantes."
        />
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  );
};
