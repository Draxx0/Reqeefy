import { Agency } from '@reqeefy/types';
import { PageHeader } from '../../../components/server.index';
import { CustomersDataTable } from './customers/CustomersDataTable';
import { AgentsDataTable } from './agents/AgentsDataTable';

export const AgencySettingsAccountContent = ({
  agency,
}: {
  agency: Agency;
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        title={'Paramètrages des comptes'}
        size="small"
        description="Gérez les comptes relatifs à votre agence, tels que vos agents et vos clients."
        hasSeparator
      />

      <CustomersDataTable agency={agency} />

      <AgentsDataTable agency={agency} />
    </div>
  );
};
