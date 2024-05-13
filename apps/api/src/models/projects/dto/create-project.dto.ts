import { IsArray, IsOptional, IsString } from 'class-validator';
import { TicketSubjectCategoryEntity } from 'src/models/ticket-subject-categories/entities/ticket-subject-category.entity';

export class CreateProjectDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // Optionnally PHOTO_URL

  @IsOptional()
  @IsArray()
  ticket_subject_categories: TicketSubjectCategoryEntity[];

  @IsArray()
  @IsString({
    each: true,
    message: 'agents_referents_ids must be an array of strings',
  })
  agents_referents_ids: string[];
}
