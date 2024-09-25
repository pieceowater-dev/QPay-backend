import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenPayload } from './authorization/auth/interfaces/token.payload';
import { UserRoles } from './modules/users/entities/user.entity';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private readonly roles: UserRoles) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request['user'] as TokenPayload;

    return this.roles.includes(user.role);
  }
}
