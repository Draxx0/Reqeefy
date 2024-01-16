import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload_file')
export class UploadFileEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
