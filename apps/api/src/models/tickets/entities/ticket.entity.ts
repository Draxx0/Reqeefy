import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketPriority, TicketStatus } from '@reqeefy/types';
import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { MessageEntity } from 'src/models/messages/entities/message.entity';
import { AgencyGroupEntity } from 'src/models/agency-groups/entities/agency-group.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';

@Entity('ticket')
export class TicketEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ['open', 'pending', 'archived'],
    default: 'pending',
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    nullable: true,
    default: null,
  })
  priority: TicketPriority;

  @Column({
    type: 'boolean',
    default: false,
  })
  distributed: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  archiving_at: Date;

  // RELATIONS

  @ManyToOne(() => ProjectEntity, (project) => project.tickets)
  project: ProjectEntity;

  @ManyToMany(() => AgentEntity, (agent) => agent.tickets_support, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinTable()
  support_agents: AgentEntity[];

  @ManyToMany(() => CustomerEntity, (customer) => customer.tickets, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinTable()
  customers: CustomerEntity[];

  @OneToMany(() => MessageEntity, (message) => message.ticket, {
    cascade: ['insert', 'update'],
  })
  messages: MessageEntity[];

  @ManyToMany(() => AgencyGroupEntity, (agency_group) => agency_group.tickets, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinTable()
  agency_groups: AgencyGroupEntity[];

  @OneToMany(() => UploadFileEntity, (upload_file) => upload_file.ticket)
  upload_files: UploadFileEntity[];

  // METHODS
  sortMessages() {
    if (this.messages.length > 1) {
      this.messages.sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      });
    }
  }
}
