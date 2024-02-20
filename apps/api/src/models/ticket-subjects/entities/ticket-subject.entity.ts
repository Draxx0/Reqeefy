import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { TicketSubjectCategoryEntity } from 'src/models/ticket-subject-categories/entities/ticket-subject-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_subject')
export class TicketSubjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // RELATIONS

  @ManyToOne(
    () => TicketSubjectCategoryEntity,
    (category) => category.ticket_subjects,
  )
  ticket_subject_category: TicketSubjectCategoryEntity;
}
