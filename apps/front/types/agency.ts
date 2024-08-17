import { AgencyGroup, Agent, Project, UserRole } from '@reqeefy/types';
export interface AgencyCustomerTableData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  project: Project | null;
}

export interface AgencyAgentTableData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  agentSelfData: {
    id: string;
  };
  role: Omit<UserRole, 'customer'>;
  group?: AgencyGroup;
}

export interface AgencyGroupTableData {
  id: string;
  name: string;
  agents: Agent[];
}
