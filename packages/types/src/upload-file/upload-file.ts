import { Timestamps } from '../common';export interface UploadFile extends Timestamps {
  id: string;
  file_name: string;
  file_url: string;
}
