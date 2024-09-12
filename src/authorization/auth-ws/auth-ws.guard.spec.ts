import { AuthWsGuard } from './auth-ws.guard';

describe('AuthWsGuard', () => {
  it('should be defined', () => {
    expect(new AuthWsGuard()).toBeDefined();
  });
});
