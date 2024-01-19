import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_subject_category')
export class TicketSubjectCategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;
}
