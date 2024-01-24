import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { TicketSubjectEntity } from 'src/models/ticket-subjects/entities/ticket-subject.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ticket_subject_category')
export class TicketSubjectCategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // RELATIONS

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.ticket_subject_categories,
  )
  project: ProjectEntity;

  //? Does i switch this relations as ManyToMany ? Is a ticket subject can be used in multiple ticket subject categories ? ( reminder )
  @OneToMany(
    () => TicketSubjectEntity,
    (ticketSubject) => ticketSubject.ticket_subject_category,
    {
      eager: true,
      cascade: ['insert', 'update'],
    },
  )
  ticket_subjects: TicketSubjectEntity[];
}
