import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketSubjectDto } from './create-ticket-subject.dto';

export class UpdateTicketSubjectDto extends PartialType(CreateTicketSubjectDto) {}
