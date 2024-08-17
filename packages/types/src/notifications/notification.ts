import { Timestamps } from '../common';
import { NotificationType } from './enum';

export interface Notification extends Timestamps {
  id: string;
  type: NotificationType;
  link: string | null;
  message: string;
  read: boolean;
}
