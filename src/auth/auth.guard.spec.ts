import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  it('should be defined', () => {
    let service: JwtService;
    expect(new AuthGuard(service)).toBeDefined();
  });
});
