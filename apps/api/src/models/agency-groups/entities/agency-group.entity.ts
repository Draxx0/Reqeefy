import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agency_group')
export class AgencyGroupEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
