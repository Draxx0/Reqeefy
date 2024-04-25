'use client';

import { Agency } from '@reqeefy/types';
import { PageHeader } from '../../../components/server.index';
import { DataTable } from '../../../components/common/components/data-table';
import { useGetAgents, useGetCustomers } from '@/hooks/user';
import { agentsColumns } from '../../../components/agency/agency-accounts/agents/AgentsColumns';
import { customersColumns } from '../../../components/agency/agency-accounts/customers/CustomersColumns';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/client.index';
import { Pickaxe, UserPlus } from 'lucide-react';

export const AgencySettingsAccountContent = ({
  agency,
}: {
  agency: Agency;
}) => {
  const customers = useGetCustomers({ agency });
  const agents = useGetAgents({ agency });

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
        <DataTable
          columns={customersColumns}
          data={customers}
          isAccessible={agency.projects.length > 0}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-3">
                Ajouter un client <UserPlus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un client</DialogTitle>
                <DialogDescription>
                  Remplissez les informations nécessaires pour ajouter un
                  nouveau client.
                </DialogDescription>
              </DialogHeader>
              {/* FORM */}
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DataTable>
      </div>

      <div className="space-y-4">
        <PageHeader
          title={'Agents'}
          size="small"
          description="Gérez vos agents, ajoutez-en de nouveaux ou modifiez les informations existantes."
        />
        <DataTable columns={agentsColumns} data={agents} isAccessible>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-3">
                Ajouter un agent <Pickaxe className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un agent</DialogTitle>
                <DialogDescription>
                  Remplissez les informations nécessaires pour ajouter un nouvel
                  agent.
                </DialogDescription>
              </DialogHeader>
              {/* FORM */}
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DataTable>
      </div>
    </div>
  );
};
