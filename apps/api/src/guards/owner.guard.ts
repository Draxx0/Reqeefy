import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '@reqeefy/types';
import { Request } from 'express';
import { UsersService } from '../models/users/users.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user: User = request.user as User;
    const userId = request.params.id;

    if (!user) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }

    const isOwner = await this.usersService.isOwner(user.id, userId);

    if (!isOwner) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
