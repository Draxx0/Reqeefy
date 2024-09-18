import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { TicketEntity } from '../../../models/tickets/entities/ticket.entity';
import { UploadFileEntity } from '../../../models/upload-files/entities/upload-file.entity';
import { UserEntity } from '../../../models/users/entities/user.entity';

@Entity('message')
export class MessageEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ type: 'boolean', default: false })
  updated: boolean;

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
