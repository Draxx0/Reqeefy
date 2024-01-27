import { UserEntity } from 'src/models/users/entities/user.entity';

export interface TokenObject {
  access_token: string;
  user: UserEntity;
}
