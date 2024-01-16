import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class MessageEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
