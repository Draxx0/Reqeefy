import { AgencyEntity } from 'src/models/agencies/entities/agency.entity';
import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { MessageEntity } from 'src/models/messages/entities/message.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false, type: 'boolean' })
  is_email_confirmed: boolean;

  // RELATIONS

  @OneToOne(() => UploadFileEntity, (uploadFile) => uploadFile.user, {
    nullable: true,
    eager: true,
  })
  avatar: UploadFileEntity;

  @OneToOne(() => AgentEntity, (agent) => agent.user, {
    nullable: true,
    eager: true,
  })
  agent: AgentEntity;

  @OneToOne(() => CustomerEntity, (customer) => customer.user, {
    nullable: true,
    eager: true,
  })
  customer: CustomerEntity;

  @ManyToMany(() => AgencyEntity, (agency) => agency.users)
  agencies: AgencyEntity[];

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];
}
