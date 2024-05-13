import { ViewMode } from '@reqeefy/types';
import { IsIn, IsString } from 'class-validator';

export class CreateUserPreferencesDTO {
  @IsString()
  @IsIn(['grid', 'row'])
  viewMode: ViewMode;
}
