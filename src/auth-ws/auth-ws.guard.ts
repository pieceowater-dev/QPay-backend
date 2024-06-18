import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class AuthWsGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ws = context.switchToWs();
    const token =
      this.extractTokenFromWsPayload(ws) ??
      this.extractTokenFromWsRequestHeaders(ws);
    if (!token) {
      throw new UnauthorizedException();
    }
    console.log(token);
    try {
      ws.getClient()['data'] = await this.jwt.verifyAsync(token, {
        ignoreExpiration: true,
      });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromWsPayload(ws: WsArgumentsHost): string | undefined {
    const [type, token] = ws.getClient().handshake.auth.token?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromWsRequestHeaders(
    ws: WsArgumentsHost,
  ): string | undefined {
    const [type, token] =
      ws.getClient().handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
