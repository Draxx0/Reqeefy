import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { TicketEntity } from '../../../models/tickets/entities/ticket.entity';
import { UserEntity } from '../../../models/users/entities/user.entity';

@Entity('customer')
export class CustomerEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // RELATIONS

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.customers, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @ManyToMany(() => TicketEntity, (ticket) => ticket.customers)
  tickets: TicketEntity[];
}
