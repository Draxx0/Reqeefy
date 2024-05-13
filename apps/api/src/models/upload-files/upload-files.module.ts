import { Module } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { UploadFilesController } from './upload-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileEntity } from './entities/upload-file.entity';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { MessageEntity } from '../messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadFileEntity, TicketEntity, MessageEntity]),
  ],
  controllers: [UploadFilesController],
  providers: [UploadFilesService],
  exports: [UploadFilesService],
})
export class UploadFilesModule {}
