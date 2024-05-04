import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { paymentsProvider } from './payments.provider';
import { DatabaseModule } from '../database/database.module';
import { GlobalJwtModule } from '../jwt/jwt.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, ...paymentsProvider],
  exports: [PaymentsService],
  imports: [DatabaseModule, GlobalJwtModule],
})
export class PaymentsModule {}
