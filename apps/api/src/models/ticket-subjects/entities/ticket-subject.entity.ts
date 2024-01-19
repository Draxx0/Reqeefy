import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_subject')
export class TicketSubjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
}
