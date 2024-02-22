import { AgencyEntity } from 'src/models/agencies/entities/agency.entity';
import { AgentEntity } from 'src/models/agents/entities/agent.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { MessageEntity } from 'src/models/messages/entities/message.entity';
import { UploadFileEntity } from 'src/models/upload-files/entities/upload-file.entity';
import { UserPreferencesEntity } from 'src/models/user-preferences/entities/user-preferences.entity';
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
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  avatar: UploadFileEntity;

  @OneToOne(() => AgentEntity, (agent) => agent.user, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  agent: AgentEntity;

  @OneToOne(() => CustomerEntity, (customer) => customer.user, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  customer: CustomerEntity;

  @OneToOne(
    () => UserPreferencesEntity,
    (user_preferences) => user_preferences.user,
  )
  preferences: UserPreferencesEntity;

  @ManyToMany(() => AgencyEntity, (agency) => agency.users, {
    onDelete: 'CASCADE',
  })
  agencies: AgencyEntity[];

  @OneToMany(() => MessageEntity, (message) => message.user, {
    onDelete: 'NO ACTION',
  })
  messages: MessageEntity[];
}
