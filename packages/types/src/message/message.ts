import { Timestamps } from '../common/timestamps';
import { Ticket } from '../ticket';
import { UploadFile } from '../upload-file';
import { User } from '../user';

export interface Message extends Timestamps {
  id: string;
  content: string;
  user: User;
  ticket: Ticket;
  updated: boolean;
  upload_files: UploadFile[];
}
