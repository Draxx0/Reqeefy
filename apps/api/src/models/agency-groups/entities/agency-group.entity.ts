import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agency_group')
export class AgencyGroupEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // RELATIONS

  @ManyToMany(() => AgentEntity, (agent) => agent.agencyGroups, {
    eager: true,
    onDelete: 'CASCADE',
  })
  agents: AgentEntity[];
}
