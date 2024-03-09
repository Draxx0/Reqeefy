import { UserEntity } from 'src/models/users/entities/user.entity';

export interface TokenObject {
  access_token: string;
  user: UserEntity;
}

export interface UserRequest extends Request {
  user: {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
}
