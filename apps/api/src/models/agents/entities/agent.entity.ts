import { AgencyGroupEntity } from 'src/models/agency-groups/entities/agency-group.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { TicketEntity } from 'src/models/tickets/entities/ticket.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
