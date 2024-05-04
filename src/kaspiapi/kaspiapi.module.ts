import { Module } from '@nestjs/common';
import { KaspiapiService } from './kaspiapi.service';
import { KaspiapiController } from './kaspiapi.controller';
import { PostsWsModule } from '../posts-ws/posts-ws.module';
import { DatabaseModule } from '../database/database.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  controllers: [KaspiapiController],
  providers: [KaspiapiService],
  imports: [DatabaseModule, PostsWsModule, PaymentsModule],
})
export class KaspiapiModule {}
