import { Timestamps } from '../common';

export interface UploadFile extends Timestamps {
  id: string;
  name: string;
  size: number;
  path: string;
}
