import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agent')
export class AgentEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
