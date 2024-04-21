import { Project } from '../project/project';
import { UploadFile } from '../upload-file/upload-file';
import { User } from '../user/user';
import { AgencyGroup } from './agency-groups';
import { AgencyActivityArea } from './enum';

export interface Agency {
  id: string;
  name: string;
  description: string | null;
  websitte_url: string | null;
  activity_area: AgencyActivityArea;
  agency_photo: UploadFile | null;
  users: User[];
  agency_groups: AgencyGroup[];
  projects: Project[];
}
