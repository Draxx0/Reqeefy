import { Timestamps } from '../common';
import { Project } from '../project/project';
import { UploadFile } from '../upload-file/upload-file';
import { User } from '../user/user';
import { AgencyGroup } from './agency-groups';
import { AgencyActivityArea } from './enum';

export interface Agency extends Timestamps {
  id: string;
  name: string;
  description: string | null;
  website_url: string | null;
  activity_area: AgencyActivityArea;
  agency_photo: UploadFile | null;
  users: User[];
  agency_groups: AgencyGroup[];
  projects: Project[];
}
