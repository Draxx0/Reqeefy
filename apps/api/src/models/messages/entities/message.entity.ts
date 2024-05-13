import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { TicketEntity } from 'src/models/tickets/entities/ticket.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
export class MessageEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  // RELATIONS

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => UploadFileEntity, (uploadFile) => uploadFile.message, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  upload_files: UploadFileEntity[];

  @ManyToOne(() => TicketEntity, (ticket) => ticket.messages, {
    onDelete: 'CASCADE',
  })
  ticket: TicketEntity;
}
