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
    const method = request.method;

    if (method !== this.allowedMethod) {
      console.log('Only GET requests are allowed');
      throw new ForbiddenException('Only GET requests are allowed');
    }

    const clientIp = this.getClientIp(request);

    if (clientIp !== this.allowedIp) {
      throw new ForbiddenException('Requests from this IP are not allowed');
    }

    return true;
  }

  private getClientIp(request: Request): string {
    const xForwardedFor = request.headers['x-forwarded-for'];
    if (typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0].trim();
    }
    return request.ip;
  }
}
