import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sanitize } from 'src/utils/sanitizer';
import { Repository } from 'typeorm';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { CreateMessageDto } from './dto/create-message.dto';
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

  async findOneById(id: string) {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.ticket', 'ticket')
      .where('message.id = :id', { id })
      .getOne();

    if (!message) {
      throw new HttpException('Message not found', 404);
    }

    return message;
  }

  async updateReadStatus(id: string) {
    const message = await this.findOneById(id);

    message.readed = true;

    return this.messageRepository.save(message);
  }
}
