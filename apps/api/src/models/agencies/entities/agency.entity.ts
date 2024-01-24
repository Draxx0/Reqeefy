import { AgencyGroupEntity } from 'src/models/agency-groups/entities/agency-group.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('agency')
export class AgencyEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @ManyToMany(() => UserEntity, (user) => user.agencies)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => AgencyGroupEntity, (agencyGroup) => agencyGroup.agency, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  agencyGroups: AgencyGroupEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.agency, {
    eager: true,
  })
  projects: ProjectEntity[];
}
