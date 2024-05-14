import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sanitize } from 'src/utils/sanitizer';
import { Repository } from 'typeorm';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';
import { UploadFilesService } from '../upload-files/upload-files.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly uploadFilesService: UploadFilesService,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    ticketId: string,
    userId: string,
  ) {
    const { content, uploadedFiles } = createMessageDto;

    const cleanedContent = sanitize(content);

    const message = this.messageRepository.create({
      content: cleanedContent,
      ticket: { id: ticketId },
      user: { id: userId },
    });

    await this.messageRepository.save(message);

    const messageUploadedFiles = await Promise.all(
      uploadedFiles.map((file) =>
        this.uploadFilesService.createMessageFile(
          {
            fileName: file.fileName,
            publicUrl: file.publicUrl,
          },
          message.id,
          ticketId,
        ),
      ),
    );

    message.upload_files = messageUploadedFiles;

    return this.messageRepository.save(message);
  }

  createOnTicket(content: string, ticket: TicketEntity, userId: string) {
    const cleanedContent = sanitize(content);

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
}
