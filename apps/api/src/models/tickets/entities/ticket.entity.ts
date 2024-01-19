import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket')
export class TicketEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ['open', 'closed'],
    default: 'open',
  })
  status: string;
}
