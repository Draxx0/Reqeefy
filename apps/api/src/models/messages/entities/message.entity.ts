import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
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

  @Column({ type: 'boolean', default: false })
  readed: boolean;

  // RELATIONS

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserEntity;

  @OneToMany(() => UploadFileEntity, (uploadFile) => uploadFile.message, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
    eager: true,
  })
  uploadFiles: UploadFileEntity[];
}
