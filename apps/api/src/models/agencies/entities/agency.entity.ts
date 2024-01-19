import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('agency')
export class AgencyEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // RELATIONS

  @ManyToMany(() => UserEntity, (user) => user.agencies)
  @JoinTable()
  users: UserEntity[];
}
