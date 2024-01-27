import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Owner of the agency creation if the user is not logged in

  // @IsOptional()
  // @IsString()
  // first_name: string;

  // @IsOptional()
  // @IsString()
  // last_name: string;

  // @IsOptional()
  // @IsEmail()
  // email: string;

  // @IsOptional()
  // @IsString()
  // password: string;
}
