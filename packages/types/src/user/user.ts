import { Agency } from '../agency';
import { Timestamps } from '../common';
import { Message } from '../message';
import { Notification } from '../notifications';
import { UploadFile } from '../upload-file';
import { UserPreferences } from '../user-preferences';
import { Agent } from './agent';
import { Customer } from './customer';
import { UserRole } from './enum';

export interface User extends Timestamps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  is_email_confirmed: boolean;
  avatar: UploadFile | null;
  agent: Agent | null;
  agency: Agency | null;
  customer: Customer | null;
  messages: Message[];
  notifications: Notification[];
  preferences: UserPreferences;
}
