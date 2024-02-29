import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  create(createMessageDto: CreateMessageDto, ticketId: string, userId: string) {
    const message = this.messageRepository.create({
      ...createMessageDto,
      ticket: { id: ticketId },
      user: { id: userId },
    });

    return this.messageRepository.save(message);
  }

  createOnTicket(createMessageDto: CreateMessageDto, userId: string) {
    const message = this.messageRepository.create({
      ...createMessageDto,
      user: { id: userId },
    });

    return this.messageRepository.save(message);
  }
}
