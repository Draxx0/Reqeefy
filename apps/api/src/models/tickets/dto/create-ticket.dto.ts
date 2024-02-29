import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { MessageEntity } from 'src/models/messages/entities/message.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  message: MessageEntity;
}
