import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { ProjectEntity } from 'src/models/projects/entities/project.entity';
import { TicketEntity } from 'src/models/tickets/entities/ticket.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
