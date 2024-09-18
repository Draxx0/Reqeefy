import { NotificationType } from '@reqeefy/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { UserEntity } from '../../../models/users/entities/user.entity';

@Entity('notification')
export class NotificationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: [
      'new_message',
      'new_ticket',
      'new_ticket_to_distribute',
      'assign_project_referent',
      'assign_group',
      'assign_project',
      'welcome',
    ],
  })
  type: NotificationType;

  @Column({ nullable: true })
  link: string | null;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  user: UserEntity;
}
