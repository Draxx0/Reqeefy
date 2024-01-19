import { AgencyGroupEntity } from 'src/models/agency-groups/entities/agency-group.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('agent')
export class AgentEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  group_name: string;

  @Column({
    type: 'enum',
    enum: ['superadmin', 'distributor', 'agent'],
    default: 'agent',
  })
  role: string;

  // RELATIONS

  @OneToOne(() => UserEntity, (user) => user.agent)
  user: UserEntity;

  @ManyToMany(() => AgencyGroupEntity, (agencyGroup) => agencyGroup.agents, {
    cascade: true,
  })
  @JoinTable()
  agencyGroups: AgencyGroupEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.agents_referents, {
    nullable: true,
  })
  @JoinTable()
  projects_referents: ProjectEntity[];
}
