import { AgencyActivityArea } from '@reqeefy/types';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAgencyWithNewUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn([
    'Conception de sites Web et développement web',
    'Marketing numérique',
    'Design graphique',
    "Développement d'applications mobiles",
    'Commerce électronique',
    'Consultation en stratégie web',
    'Développement de contenu',
    'Hébergement Web et services techniques',
    'Formation et coaching en ligne',
    'Optimisation de la conversion',
    'Gestion de la réputation en ligne',
    "Analyse de données et intelligence d'affaires",
    'Gestion de la relation client',
    'Stratégie digitale',
  ])
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
  @IsIn([
    'Conception de sites Web et développement web',
    'Marketing numérique',
    'Design graphique',
    "Développement d'applications mobiles",
    'Commerce électronique',
    'Consultation en stratégie web',
    'Développement de contenu',
    'Hébergement Web et services techniques',
    'Formation et coaching en ligne',
    'Optimisation de la conversion',
    'Gestion de la réputation en ligne',
    "Analyse de données et intelligence d'affaires",
    'Gestion de la relation client',
    'Stratégie digitale',
  ])
  activity_area: AgencyActivityArea;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  website_url: string;
}
