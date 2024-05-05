import { AgencyActivityArea } from '@reqeefy/types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AgencyActivityAreaValues } from '../data/data';
import { CreateAgencyUploadFileDto } from 'src/models/upload-files/dto/create-upload-file.dto';

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
