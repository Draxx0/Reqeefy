import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFileEntity } from './entities/upload-file.entity';
import {
  CreateAgencyUploadFileDto,
  CreateMessageUploadFileDto,
  CreateUserUploadFileDto,
} from './dto/create-upload-file.dto';
import { MessageEntity } from '../messages/entities/message.entity';
import { TicketEntity } from '../tickets/entities/ticket.entity';

@Injectable()
export class UploadFilesService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  createAgencyFile(createAgencyUploadFileDto: CreateAgencyUploadFileDto) {
    const { file_name, file_url, agencyId } = createAgencyUploadFileDto;

    const uploadFile = this.uploadFileRepository.create({
      file_name,
      file_url,
      agency: { id: agencyId },
    });

    return this.uploadFileRepository.save(uploadFile);
  }

  async createMessageFile(
    CreateMessageUploadFileDto: CreateMessageUploadFileDto,
    messageId: string,
    ticketId: string,
  ) {
    const { fileName, publicUrl } = CreateMessageUploadFileDto;

    // Créer l'entité d'UploadFile
    const uploadFile = this.uploadFileRepository.create({
      file_name: fileName,
      file_url: publicUrl,
    });

    // Chercher le ticket associé
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });

    // Si le ticket existe, associer le fichier téléchargé à ce ticket
    if (ticket) {
      uploadFile.ticket = ticket;
    }

    // Chercher le message associé
    const message = await this.messageRepository.findOneBy({ id: messageId });

    // Si le message existe, associer le fichier téléchargé à ce message
    if (message) {
      uploadFile.message = message;
    }

    // Enregistrer l'entité d'UploadFile
    return this.uploadFileRepository.save(uploadFile);
  }

  createUserFile(
    createUserUploadFileDto: CreateUserUploadFileDto,
    userId: string,
  ) {
    const { file_name, file_url } = createUserUploadFileDto;

    const uploadFile = this.uploadFileRepository.create({
      file_name,
      file_url,
      user: { id: userId },
    });

    return this.uploadFileRepository.save(uploadFile);
  }

  async findOneById(id: string) {
    const uploadFile = await this.uploadFileRepository
      .createQueryBuilder('uploadFile')
      .where('uploadFile.id = :id', { id })
      .getOne();

    return uploadFile;
  }

  delete(id: string) {
    return this.uploadFileRepository.delete({ id });
  }
}
