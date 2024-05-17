import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticationForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
