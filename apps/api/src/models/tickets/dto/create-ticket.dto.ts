import { IsNotEmpty, IsString } from 'class-validator';
import { MessageEntity } from 'src/models/messages/entities/message.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  message: MessageEntity;

  // UPLOAD FILE
}
