import { AgencyGroup, Agent, Project, UserRole } from '@reqeefy/types';
export interface AgencyCustomerTableData {
  first_name: string;
  last_name: string;
  email: string;
  project: Project | null;
}

export interface AgencyAgentTableData {
  first_name: string;
  last_name: string;
  email: string;
  role: Omit<UserRole, 'customer'>;
  group?: AgencyGroup;
}

export interface AgencyGroupTableData {
  name: string;
  agents: Agent[];
}
