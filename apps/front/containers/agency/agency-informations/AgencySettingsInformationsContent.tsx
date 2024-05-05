'use client';import { Agency } from '@reqeefy/types';
import { useMemo } from 'react';
import { AgencySettingsInformationsForm } from './AgencySettingsInformationsForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '../../../components/client.index';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  PageHeader,
} from '../../../components/server.index';
import { FolderGit2, Pickaxe, User } from 'lucide-react';
import { AgencyGroupsTable } from './agency-groups/AgencyGroupsTable';
import { AgencyUploadPhoto } from './AgencyUploadPhoto';

export const AgencySettingsInformationsContent = ({
  agency,
}: {
  agency: Agency;
}) => {
  // Move this logic to a hook ?
  const customersCount = useMemo(() => {
    if (!agency)
      return `Une erreur est survenue lors de la récupération des clients.`;
    const count = agency.users.reduce((acc, user) => {
      if (user.role === 'customer') {
        acc++;
      }
      return acc;
    }, 0);

    if (count === 0) {
      return `${agency.name} n'a encore aucun client.`;
    }

    return `${agency.name} a ${count} client(s).`;
  }, [agency]);

  const projectsCount = useMemo(() => {
    if (!agency) {
      return `Une erreur est survenue lors de la récupération des projets actifs.`;
    }

    const count = agency.projects.filter(
      (project) => project.status === 'active'
    ).length;

    if (count === 0) {
      return `${agency.name} n'a pas de projets actifs.`;
    }

    return `${agency.name} a ${count} projet(s) actif.`;
  }, [agency]);

  const agentsCount = useMemo(() => {
    if (!agency) {
      return `Une erreur est survenue lors de la récupération des agents.`;
    }

    const count = agency.users.reduce((acc, user) => {
      if (
        user.role === 'agent' ||
        user.role === 'distributor' ||
        user.role === 'superadmin'
      ) {
        acc++;
      }
      return acc;
    }, 0);

    if (count === 0) {
      return `${agency.name} n'a pas encore d'agents.`;
    }

    return `${agency.name} a ${count} agent(s).`;
  }, [agency]);

  return (
    <div className="space-y-12">
      <PageHeader
        title={agency.name}
        description={agency.description || 'Aucune description'}
        hasSeparator
        size="small"
      />

      <div className="flex gap-6">
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
