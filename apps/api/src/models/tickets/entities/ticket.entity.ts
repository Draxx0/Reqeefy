import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket')
export class TicketEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
