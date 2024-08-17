import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // Optionnally PHOTO_URL
  @IsNotEmpty()
  @IsArray()
  @IsString({
    each: true,
    message: 'agents_referents_ids must be an array of strings',
  })
  agents_referents_ids: string[];
}
