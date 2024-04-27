import { AgencyActivityArea } from '@reqeefy/types';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AgencyActivityAreaValues } from '../data/data';

export class CreateAgencyWithNewUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIn([...AgencyActivityAreaValues])
  activity_area: AgencyActivityArea;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  website_url?: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
