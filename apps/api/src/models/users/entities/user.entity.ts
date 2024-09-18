import { UserRole } from '@reqeefy/types';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgencyEntity } from '../../../models/agencies/entities/agency.entity';
import { AgentEntity } from '../../../models/agents/entities/agent.entity';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { CustomerEntity } from '../../../models/customers/entities/customer.entity';
import { MessageEntity } from '../../../models/messages/entities/message.entity';
import { NotificationEntity } from '../../../models/notifications/entities/notification.entity';
import { UploadFileEntity } from '../../../models/upload-files/entities/upload-file.entity';
import { UserPreferencesEntity } from '../../../models/user-preferences/entities/user-preferences.entity';

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

  @Column({
    type: 'enum',
    enum: ['superadmin', 'distributor', 'agent', 'customer'],
    nullable: true,
  })
  role: UserRole;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  reset_password_token_expires: Date;

  // RELATIONS

  @OneToOne(() => UploadFileEntity, (uploadFile) => uploadFile.user, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
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

  @ManyToOne(() => AgencyEntity, (agency) => agency.users, {
    onDelete: 'CASCADE',
  })
  agency: AgencyEntity;

  @OneToMany(() => MessageEntity, (message) => message.user, {
    onDelete: 'NO ACTION',
  })
  messages: MessageEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user, {
    onDelete: 'CASCADE',
  })
  notifications: NotificationEntity[];
}
