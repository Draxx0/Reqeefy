import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketSubjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
