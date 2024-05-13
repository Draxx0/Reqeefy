import { IsString } from 'class-validator';

export class CreateAgencyUploadFileDto {
  @IsString()
  file_name: string;

  @IsString()
  file_url: string;

  @IsString()
  agencyId: string;
}

export class CreateUserUploadFileDto {
  @IsString()
  file_name: string;

  @IsString()
  file_url: string;
}

export class CreateMessageUploadFileDto {
  @IsString()
  fileName: string;

  @IsString()
  publicUrl: string;
}
