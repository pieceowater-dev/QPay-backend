import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { paymentsProvider } from './payments.provider';
import { DatabaseModule } from '../../core/database/database.module';
import { GlobalJwtModule } from '../../core/jwt/jwt.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, ...paymentsProvider],
  exports: [PaymentsService],
  imports: [DatabaseModule, GlobalJwtModule],
})
export class PaymentsModule {}
