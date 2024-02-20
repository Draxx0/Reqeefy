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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn([...AgencyActivityAreaValues])
  activity_area: AgencyActivityArea;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  website_url: string;

  // Owner of the agency creation if the user is not logged in

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}

export class CreateAgencyWithExistingUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn([...AgencyActivityAreaValues])
  activity_area: AgencyActivityArea;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  website_url: string;
}
