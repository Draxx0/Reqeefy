import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgencyEntity } from '../../../models/agencies/entities/agency.entity';
import { AgentEntity } from '../../../models/agents/entities/agent.entity';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { TicketEntity } from '../../../models/tickets/entities/ticket.entity';

@Entity('agency_group')
export class AgencyGroupEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @OneToMany(() => AgentEntity, (agent) => agent.agency_group, {
    onDelete: 'CASCADE',
  })
  agents: AgentEntity[];

  @ManyToMany(() => TicketEntity, (ticket) => ticket.agency_groups, {
    onDelete: 'CASCADE',
  })
  tickets: TicketEntity[];

  @ManyToOne(() => AgencyEntity, (agency) => agency.agency_groups, {
    onDelete: 'CASCADE',
  })
  agency: AgencyEntity;
}
