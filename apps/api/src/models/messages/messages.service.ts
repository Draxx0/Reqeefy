import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { sanitize } from 'src/utils/sanitizer';

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

  createOnTicket(
    createMessageDto: CreateMessageDto,
    ticket: TicketEntity,
    userId: string,
  ) {
    const cleanedContent = sanitize(createMessageDto.content);

    const message = this.messageRepository.create({
      content: cleanedContent,
      ticket,
      user: { id: userId },
    });

    return this.messageRepository.save(message);
  }

  findAllByTicket(ticketId: string) {
    return this.messageRepository.find({
      relations: ['user', 'ticket'],
    });
  }
}
