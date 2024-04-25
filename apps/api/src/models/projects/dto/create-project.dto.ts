import { IsArray, IsString } from 'class-validator';
import { TicketSubjectCategoryEntity } from 'src/models/ticket-subject-categories/entities/ticket-subject-category.entity';

export class CreateProjectDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // Optionnally PHOTO_URL

  @IsArray()
  ticket_subject_categories: TicketSubjectCategoryEntity[];

  @IsArray()
  @IsString({ each: true })
  agents_referents_ids: string[];
}
