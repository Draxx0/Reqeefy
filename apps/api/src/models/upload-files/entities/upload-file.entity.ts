import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { MessageEntity } from 'src/models/messages/entities/message.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgencyEntity } from 'src/models/agencies/entities/agency.entity';

@Entity('upload_file')
export class UploadFileEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // RELATIONS

  @OneToOne(() => UserEntity, (user) => user.avatar, {
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => AgencyEntity, (agency) => agency.agency_photo, {
    nullable: true,
  })
  @JoinColumn()
  agency: AgencyEntity;

  @OneToOne(() => ProjectEntity, (project) => project.photo_url, {
    nullable: true,
  })
  @JoinColumn()
  project: ProjectEntity;

  @ManyToOne(() => MessageEntity, (message) => message.upload_files, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  message: MessageEntity;
}
