import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ws = context.switchToWs();
    const token =
      this.extractTokenFromHeader(request) ??
      this.extractTokenFromWsPayload(ws);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromWsPayload(ws: WsArgumentsHost): string | undefined {
    const [type, token] = ws.getClient().handshake.auth.token?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
