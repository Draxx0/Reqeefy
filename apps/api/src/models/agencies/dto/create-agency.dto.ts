import { AgencyActivityArea } from '@reqeefy/types';
import {
  IsArray,
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

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  agency_groups: string[];

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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIn([...AgencyActivityAreaValues])
  activity_area: AgencyActivityArea;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  agency_groups: string[];

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  website_url: string;
}
