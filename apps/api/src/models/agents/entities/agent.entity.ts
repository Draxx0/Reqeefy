import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgencyGroupEntity } from '../../../models/agency-groups/entities/agency-group.entity';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { TicketEntity } from '../../../models/tickets/entities/ticket.entity';
import { UserEntity } from '../../../models/users/entities/user.entity';

@Entity('agent')
export class AgentEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // RELATIONS

  @OneToOne(() => UserEntity, (user) => user.agent)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => AgencyGroupEntity, (agencyGroup) => agencyGroup.agents, {
    cascade: ['insert', 'update'],
  })
  agency_group: AgencyGroupEntity;

  @ManyToMany(() => ProjectEntity, (project) => project.agents_referents, {
    nullable: true,
  })
  @JoinTable()
  projects_referents: ProjectEntity[];

  @ManyToMany(() => TicketEntity, (ticket) => ticket.support_agents, {})
  tickets_support: TicketEntity[];
}
