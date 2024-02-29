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
import { TicketSubjectEntity } from 'src/models/ticket-subjects/entities/ticket-subject.entity';

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
  archiving_date: Date;

  // RELATIONS

  @ManyToOne(() => ProjectEntity, (project) => project.tickets)
  project: ProjectEntity;

  @ManyToOne(() => TicketSubjectEntity, (subject) => subject.tickets)
  subject: TicketSubjectEntity[];

  @ManyToMany(() => AgentEntity, (agent) => agent.tickets_support, {
    cascade: ['insert', 'update'],
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
}
