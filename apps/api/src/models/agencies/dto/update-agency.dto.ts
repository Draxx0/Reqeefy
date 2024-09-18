import { AgencyActivityArea } from '@reqeefy/types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateAgencyUploadFileDto } from '../../../models/upload-files/dto/create-upload-file.dto';
import { AgencyActivityAreaValues } from '../data/data';

export class UpdateAgencyDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  website_url?: string;

  @IsOptional()
  @IsEnum(AgencyActivityAreaValues)
  activity_area?: AgencyActivityArea;

  @IsOptional()
  agency_photo?: CreateAgencyUploadFileDto;
}
