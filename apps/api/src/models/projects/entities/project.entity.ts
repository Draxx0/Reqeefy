import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
