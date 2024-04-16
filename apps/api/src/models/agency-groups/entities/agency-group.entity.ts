import { AgencyEntity } from 'src/models/agencies/entities/agency.entity';
import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { TicketEntity } from 'src/models/tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('agency_group')
export class AgencyGroupEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @ManyToMany(() => AgentEntity, (agent) => agent.agency_groups, {
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
