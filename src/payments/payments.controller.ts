import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth.guard';
import { AuthTypes } from '../auth/enums/auth.types';
import { FilterPaymentDto } from './dto/filter.payment.dto';
import { PaymentsEntity } from './entities/payment.entity';
import { PaginatedList } from '../utils/paginated.list';
import { PaymentsReportFilterPipe } from './payments.report.filter.pipe';
import { FilterPieTypeDto } from './dto/filter.pie.type.dto';
import { FilterPiePostsDto } from './dto/filter.pie.posts.dto';
import { FilterDayDebitDto } from './dto/filter.day.debit.dto';
import { ReportDayDebitResponseDto } from './dto/report.day.debit.response.dto';
import { ReportPiePostsResponseDto } from './dto/report.pie.posts.response.dto';
import { ReportPieTypeResponseDto } from './dto/report.pie.type.response.dto';
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

  @Get('pie-type')
  pieType(
    @Query(PaymentsReportFilterPipe) filter: FilterPieTypeDto,
  ): Promise<ReportPieTypeResponseDto[]> {
    return this.paymentsService.getTypePie(filter);
  }

  @Get('pie-posts')
  piePosts(
    @Query(PaymentsReportFilterPipe) filter: FilterPiePostsDto,
  ): Promise<ReportPiePostsResponseDto[]> {
    return this.paymentsService.getPostsPie(filter);
  }

  @Get('day-debit')
  dayDebit(
    @Query(PaymentsReportFilterPipe) filter: FilterDayDebitDto,
  ): Promise<ReportDayDebitResponseDto> {
    return this.paymentsService.getPayDebit(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentsEntity> {
    return await this.paymentsService.findOne(+id);
  }
}
