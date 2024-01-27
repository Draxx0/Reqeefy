import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
