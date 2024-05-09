import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { UsersModule } from '../users/users.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    UsersModule,
    UploadFilesModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
