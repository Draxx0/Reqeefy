import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketSubjectCategoryDto } from './create-ticket-subject-category.dto';

export class UpdateTicketSubjectCategoryDto extends PartialType(CreateTicketSubjectCategoryDto) {}
