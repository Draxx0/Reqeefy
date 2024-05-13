import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { TicketSubjectEntity } from 'src/models/ticket-subjects/entities/ticket-subject.entity';

export class CreateTicketSubjectCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  ticket_subjects: TicketSubjectEntity[];
}
