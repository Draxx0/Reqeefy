import { Agency } from '@reqeefy/types';
import { useMemo } from 'react';

export const useGetAgents = ({ agency }: { agency: Agency }) => {
  const agents = useMemo(() => {
    const agents = agency.users.filter(
      (user) =>
        user.role === 'agent' ||
        user.role === 'distributor' ||
        user.role === 'superadmin'
    );

    return agents.map((userAsAgent) => ({
      id: userAsAgent.id,
      first_name: userAsAgent.first_name,
      last_name: userAsAgent.last_name,
      email: userAsAgent.email,
      role: userAsAgent.role,
      groups: userAsAgent.agent?.agency_groups || [],
    }));
  }, [agency.users]);

  return agents;
};