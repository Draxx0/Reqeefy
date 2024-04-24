import { ProjectStatus } from './enum';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
}
