import { UserRole } from '@reqeefy/types';
import { UserEntity } from 'src/models/users/entities/user.entity';

export interface TokenObject {
  access_token: string;
  user: UserEntity;
}

export interface UserRequest extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
  };
}
