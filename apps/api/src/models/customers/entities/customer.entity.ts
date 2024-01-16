import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class CustomerEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
