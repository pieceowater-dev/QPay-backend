import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { DefaultFilterPipe } from '../utils/default.filter.pipe';
import { DefaultFilter } from '../utils/default.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth.guard';
import { AuthTypes } from '../auth/enums/auth.types';

@ApiTags('Payments')
@UseGuards(AuthGuard)
@ApiBearerAuth(AuthTypes.JWT)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(@Query(DefaultFilterPipe) filter: DefaultFilter) {
    return this.paymentsService.findPaginatedMany(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }
}
