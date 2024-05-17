import { IsString } from 'class-validator';

export class AuthenticationResetPasswordDto {
  @IsString()
  password: string;

  @IsString()
  password_confirmation: string;
}
