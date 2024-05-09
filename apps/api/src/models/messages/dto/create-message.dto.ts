import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateMessageUploadFileDto } from 'src/models/upload-files/dto/create-upload-file.dto';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsArray()
  uploadedFiles: CreateMessageUploadFileDto[];
}
