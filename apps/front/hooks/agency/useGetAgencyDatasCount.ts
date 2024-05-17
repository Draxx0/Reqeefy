'use client';

import { Agency } from '@reqeefy/types';
import { useMemo } from 'react';

export const useGetAgencyDatasCount = ({ agency }: { agency: Agency }) => {
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

  return { customersCount, projectsCount, agentsCount };
};
