import { IsArray, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  name: string;

  @IsString()
  agencyId: string;

  // Optionnally PHOTO_URL

  //! I'm not sure if that works
  @IsArray()
  @IsString({ each: true })
  agents_referents_ids: string[];
}
