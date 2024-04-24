import { Module } from '@nestjs/common';
import { KaspiapiService } from './kaspiapi.service';
import { KaspiapiController } from './kaspiapi.controller';

@Module({
  controllers: [KaspiapiController],
  providers: [KaspiapiService],
})
export class KaspiapiModule {}
