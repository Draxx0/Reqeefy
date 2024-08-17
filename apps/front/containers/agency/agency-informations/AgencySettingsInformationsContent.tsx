'use client';
import { useGetAgencyDatasCount } from '@/hooks';
import { Agency } from '@reqeefy/types';
import { FolderGit2, Pickaxe, User } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/client.index';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  PageHeader,
} from '../../../components/server.index';
import { AgencyGroupsTable } from './agency-groups/AgencyGroupsTable';
import { AgencySettingsInformationsForm } from './AgencySettingsInformationsForm';
import { AgencyUploadPhoto } from './AgencyUploadPhoto';

export const AgencySettingsInformationsContent = ({
  agency,
}: {
  agency: Agency;
}) => {
  const { agentsCount, customersCount, projectsCount } = useGetAgencyDatasCount(
    { agency }
  );

  return (
    <div className="space-y-12">
      <PageHeader
        title={agency.name}
        description={agency.description || 'Aucune description'}
        hasSeparator
        size="small"
      />

      <div className="flex flex-col md:flex-row gap-6">
        <Alert className="w-fit">
          <User className="h-4 w-4" />
          <AlertTitle>Clients</AlertTitle>
          <AlertDescription>{customersCount}</AlertDescription>
        </Alert>

        <Alert className="w-fit">
          <Pickaxe className="h-4 w-4" />
          <AlertTitle>Agents</AlertTitle>
          <AlertDescription>{agentsCount}</AlertDescription>
        </Alert>

        <Alert className="w-fit">
          <FolderGit2 className="h-4 w-4" />
          <AlertTitle>Projets</AlertTitle>
          <AlertDescription>{projectsCount}</AlertDescription>
        </Alert>
      </div>

      <AgencyUploadPhoto agency={agency} />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Modifier les informations de l&apos;agence
          </AccordionTrigger>
          <AccordionContent>
            <AgencySettingsInformationsForm agency={agency} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AgencyGroupsTable agency={agency} />
    </div>
  );
};
