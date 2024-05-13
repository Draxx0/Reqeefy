import { ViewMode } from '@reqeefy/types';
import { IsBoolean, IsIn, IsOptional } from 'class-validator';

export class UpdateUserPreferencesDTO {
  @IsOptional()
  @IsIn(['grid', 'row'])
  viewMode?: ViewMode;

  @IsOptional()
  @IsBoolean()
  push_notifications: boolean;

  @IsOptional()
  @IsBoolean()
  email_notifications: boolean;
}
