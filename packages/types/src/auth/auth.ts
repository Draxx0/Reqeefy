import { User } from '../user/user';

export interface TokenObject {
  access_token: string;
  user: User;
}