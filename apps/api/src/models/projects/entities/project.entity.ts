import { AgencyEntity } from 'src/models/agencies/entities/agency.entity';
import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { TicketSubjectCategoryEntity } from 'src/models/ticket-subject-categories/entities/ticket-subject-category.entity';
import { TicketEntity } from 'src/models/tickets/entities/ticket.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project')
export class ProjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @OneToOne(() => UploadFileEntity, (uploadFile) => uploadFile.project, {
    nullable: true,
  })
  photo_url: UploadFileEntity;

  @ManyToMany(() => AgentEntity, (agent) => agent.projects_referents, {
    cascade: ['insert', 'update'],
  })
  agents_referents: AgentEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.project, {
    onDelete: 'CASCADE',
  })
  tickets: TicketEntity[];

  @ManyToMany(() => CustomerEntity, (customer) => customer.projects, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  customers: CustomerEntity[];

  @ManyToOne(() => AgencyEntity, (agency) => agency.projects, {
    onDelete: 'CASCADE',
  })
  agency: AgencyEntity;

  @OneToMany(
    () => TicketSubjectCategoryEntity,
    (ticketSubjectCategory) => ticketSubjectCategory.project,
    {
      onDelete: 'CASCADE',
      cascade: ['insert', 'update'],
    },
  )
  ticket_subject_categories: TicketSubjectCategoryEntity[];
}
