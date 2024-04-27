import { Timestamps } from '../common';

export interface UploadFile extends Timestamps {
  path: string;
}
