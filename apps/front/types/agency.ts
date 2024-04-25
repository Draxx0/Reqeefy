import { AgencyGroup, Agent, Project, UserRole } from '@reqeefy/types';

export interface createAgencyCredentials {
  name: string;
  activity_area: string;
  website_url?: string;
  agency_groups: string[];
  description?: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

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
  role: Omit<UserRole, 'customer'>;
  groups: AgencyGroup[];
}

export interface AgencyGroupTableData {
  id: string;
  name: string;
  agents: Agent[];
}
