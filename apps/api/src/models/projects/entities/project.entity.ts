import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @ManyToMany(() => AgentEntity, (agent) => agent.projects_referents, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  agents_referents: AgentEntity[];
}
