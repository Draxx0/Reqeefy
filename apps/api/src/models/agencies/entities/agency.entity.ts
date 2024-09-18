import { AgencyActivityArea } from '@reqeefy/types';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgencyGroupEntity } from '../../../models/agency-groups/entities/agency-group.entity';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { UploadFileEntity } from '../../../models/upload-files/entities/upload-file.entity';
import { UserEntity } from '../../../models/users/entities/user.entity';

@Entity('agency')
export class AgencyEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website_url: string;

  @Column({
    type: 'enum',
    enum: [
      'Conception de sites Web et développement web',
      'Marketing numérique',
      'Design graphique',
      "Développement d'applications mobiles",
      'Commerce électronique',
      'Consultation en stratégie web',
      'Développement de contenu',
      'Hébergement Web et services techniques',
      'Formation et coaching en ligne',
      'Optimisation de la conversion',
      'Gestion de la réputation en ligne',
      "Analyse de données et intelligence d'affaires",
      'Gestion de la relation client',
      'Stratégie digitale',
    ],
  })
  activity_area: AgencyActivityArea;

  // RELATIONS

  @OneToOne(() => UploadFileEntity, (uploadFile) => uploadFile.agency, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  agency_photo: UploadFileEntity;

  @OneToMany(() => UserEntity, (user) => user.agency, {
    cascade: ['insert', 'update'],
  })
  users: UserEntity[];

  @OneToMany(() => AgencyGroupEntity, (agencyGroup) => agencyGroup.agency)
  agency_groups: AgencyGroupEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.agency)
  projects: ProjectEntity[];
}
