import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { UploadFilesModule } from '../upload-files/upload-files.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), UploadFilesModule],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
