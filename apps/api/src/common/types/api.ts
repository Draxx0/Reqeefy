import { UserEntity } from '../../models/users/entities/user.entity';

export interface TokenObject {
  access_token: string;
  refresh_token: string;
}

export interface UserRequest extends Request {
  user: UserEntity;
}
