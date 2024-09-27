import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { AuthTypes } from '../../authorization/auth/enums/auth.types';
import { FilterPaymentDto } from './dto/filter.payment.dto';
import { PaymentsEntity } from './entities/payment.entity';
import { PaginatedList } from '../../utils/pagination/paginated.list';
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
    @Req() req: any,
  ): Promise<PaginatedList<PaymentsEntity>> {
    return this.paymentsService.findPaginatedMany(filter, req.user);
  }

  @Get('pie-type')
  pieType(
    @Query(PaymentsReportFilterPipe) filter: FilterPieTypeDto,
    @Req() req: any,
  ): Promise<ReportPieTypeResponseDto[]> {
    return this.paymentsService.getTypePie(filter, req.user);
  }

  @Get('pie-posts')
  piePosts(
    @Query(PaymentsReportFilterPipe) filter: FilterPiePostsDto,
    @Req() req: any,
  ): Promise<ReportPiePostsResponseDto[]> {
    return this.paymentsService.getPostsPie(filter, req.user);
  }

  @Get('day-debit')
  dayDebit(
    @Query(PaymentsReportFilterPipe) filter: FilterDayDebitDto,
    @Req() req: any,
  ): Promise<ReportDayDebitResponseDto> {
    return this.paymentsService.getDayDebit(filter, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentsEntity> {
    return await this.paymentsService.findOne(+id);
  }
}
