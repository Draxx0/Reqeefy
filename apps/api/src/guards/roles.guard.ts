import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // No role requirements are specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new HttpException('Unauthorized access', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
