import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../modules/users/users.module';
import { AuthGuard } from '../../auth.guard';
import { GlobalJwtModule } from '../../core/jwt/jwt.module';

@Module({
  imports: [UsersModule, GlobalJwtModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
