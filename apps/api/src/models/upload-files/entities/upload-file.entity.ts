import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload_file')
export class UploadFileEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.avatar, {
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => ProjectEntity, (project) => project.photo_url, {
    nullable: true,
  })
  @JoinColumn()
  project: ProjectEntity;
}
