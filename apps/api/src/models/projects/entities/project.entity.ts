import { ProjectStatus } from '@reqeefy/types';
import { AgencyEntity } from 'src/models/agencies/entities/agency.entity';
import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { TicketEntity } from 'src/models/tickets/entities/ticket.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';
import {
  Column,
  Entity,
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

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'archived'],
    default: 'active',
  })
  status: ProjectStatus;

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

  @OneToMany(() => CustomerEntity, (customer) => customer.project)
  customers: CustomerEntity[];

  @ManyToOne(() => AgencyEntity, (agency) => agency.projects, {
    onDelete: 'CASCADE',
  })
  agency: AgencyEntity;
}
