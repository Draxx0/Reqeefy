import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_subject')
export class TicketSubjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
