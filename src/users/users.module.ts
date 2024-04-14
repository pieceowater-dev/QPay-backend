import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.provider';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
