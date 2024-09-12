import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpAndMethodGuard implements CanActivate {
  private readonly allowedIp = '194.187.247.152';
  private readonly allowedMethod = 'GET';

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    const method = request.method;

    console.log('IpAndMethodGuard', { request });

    if (method !== this.allowedMethod) {
      throw new ForbiddenException('Only GET requests are allowed');
    }

    if (!clientIp.endsWith(this.allowedIp)) {
      throw new ForbiddenException('Requests from this IP are not allowed');
    }

    return true;
  }
}
