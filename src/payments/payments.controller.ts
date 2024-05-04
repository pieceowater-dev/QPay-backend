import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth.guard';
import { AuthTypes } from '../auth/enums/auth.types';
import { FilterPaymentDto } from './dto/filter.payment.dto';
import { PaymentsEntity } from './entities/payment.entity';
import { PaginatedList } from '../utils/paginated.list';
import { PaymentsFilterPipe } from './payments.filter.pipe';

@ApiTags('Payments')
@UseGuards(AuthGuard)
@ApiBearerAuth(AuthTypes.JWT)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(
    @Query(PaymentsFilterPipe) filter: FilterPaymentDto,
  ): Promise<PaginatedList<PaymentsEntity>> {
    return this.paymentsService.findPaginatedMany(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentsEntity> {
    return await this.paymentsService.findOne(+id);
  }
}
