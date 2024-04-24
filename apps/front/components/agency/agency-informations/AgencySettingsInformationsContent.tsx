'use client';

import { Agency } from '@reqeefy/types';
import { useMemo } from 'react';
import { AgencySettingsInformationsForm } from './AgencySettingsInformationsForm';
import { Button } from '../../client.index';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  PageHeader,
} from '../../server.index';
import { FolderGit2, Pickaxe, User } from 'lucide-react';

export const AgencySettingsInformationsContent = ({
  agency,
}: {
  agency: Agency;
}) => {
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
      return `${agency.name} n'a encore encore aucun client.`;
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
      <div className="flex items-center gap-12">
        <Avatar className="w-20 h-20 rounded-xl">
          <AvatarImage
            src={agency.agency_photo?.path}
            alt={`Photo de l'agence ${agency.name}`}
            className="h-48 w-48 rounded-lg"
          />
          <AvatarFallback className="w-full rounded-lg h-full text-2xl flex items-center justify-center">
            {agency.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h2 className="text-lg">Photo de profile</h2>
          <div className="flex gap-4">
            <Button>Changer la photo</Button>
            {!agency.agency_photo && (
              <Button variant={'destructive'}>Supprimer</Button>
            )}
          </div>
          <p className=" text-xs text-gray-900">
            Nous supportons les formats JPG, PNG d&apos;une taille maximale de
            10Mo.
          </p>
        </div>
      </div>
      <AgencySettingsInformationsForm agency={agency} />
    </div>
  );
};
