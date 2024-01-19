import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TicketPriority, TicketStatus } from '@reqeefy/types';

@Entity('ticket')
export class TicketEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ['open', 'closed', 'pending', 'resolved'],
    default: 'open',
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
  })
  priority: TicketPriority;

  @Column({
    type: 'boolean',
    default: false,
  })
  distributed: boolean;
}
