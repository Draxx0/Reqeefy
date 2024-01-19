import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class MessageEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ type: 'boolean', default: false })
  readed: boolean;

  // RELATIONS

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserEntity;
}
