import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_subject_category')
export class TicketSubjectCategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
