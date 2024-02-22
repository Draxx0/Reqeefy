import { ViewMode } from '@reqeefy/types';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateUserPreferencesDTO {
  @IsOptional()
  @IsIn(['grid', 'row'])
  viewMode?: ViewMode;
}
