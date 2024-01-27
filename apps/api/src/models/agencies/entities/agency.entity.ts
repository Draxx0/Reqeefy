import { AgencyGroupEntity } from 'src/models/agency-groups/entities/agency-group.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('agency')
export class AgencyEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @OneToOne(() => UploadFileEntity, (uploadFile) => uploadFile.agency, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  agency_photo: UploadFileEntity;

  @ManyToMany(() => UserEntity, (user) => user.agencies)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => AgencyGroupEntity, (agencyGroup) => agencyGroup.agency, {
    cascade: ['insert', 'update'],
  })
  agency_groups: AgencyGroupEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.agency, {})
  projects: ProjectEntity[];
}
