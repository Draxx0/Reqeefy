import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../../models/common/entities/timestamp.entity';
import { UserEntity } from '../../../models/users/entities/user.entity';

@Entity('user_preferences')
export class UserPreferencesEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['grid', 'row'],
    default: 'grid',
  })
  view_mode: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  push_notifications: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  email_notifications: boolean;

  // RELATIONS

  @OneToOne(() => UserEntity, (user) => user.preferences, {
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity;
}
