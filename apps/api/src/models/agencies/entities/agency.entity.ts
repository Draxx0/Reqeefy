import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agency')
export class AgencyEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
