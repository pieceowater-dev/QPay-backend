import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.provider';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtService } from '@nestjs/jwt';
import { GlobalJwtModule } from '../jwt/jwt.module';

@Module({
  imports: [DatabaseModule, GlobalJwtModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
