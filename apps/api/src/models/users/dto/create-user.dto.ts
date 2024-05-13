import { UserRole } from '@reqeefy/types';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserUploadFileDto } from 'src/models/upload-files/dto/create-upload-file.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsIn(['superadmin', 'distributor', 'agent', 'customer'])
  role: UserRole;

  @IsNotEmpty()
  avatar: CreateUserUploadFileDto;
}
