import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project')
export class ProjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @ManyToMany(() => AgentEntity, (agent) => agent.projects_referents, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  agents_referents: AgentEntity[];

  @ManyToMany(() => CustomerEntity, (customer) => customer.projects, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  customers: CustomerEntity[];
}
