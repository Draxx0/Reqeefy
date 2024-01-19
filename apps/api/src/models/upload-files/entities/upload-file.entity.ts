import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload_file')
export class UploadFileEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.avatar)
  user: UserEntity;
}
