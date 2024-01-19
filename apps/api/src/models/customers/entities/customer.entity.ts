import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class CustomerEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // RELATIONS

  @OneToOne(() => UserEntity, (user) => user.customer)
  user: UserEntity;
}
