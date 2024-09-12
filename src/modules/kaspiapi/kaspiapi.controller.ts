import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { KaspiapiService } from './kaspiapi.service';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { RequestKaspiDto } from './dto/request.kaspi.dto';
import { ApiTags } from '@nestjs/swagger';
import { IpAndMethodGuard } from './kaspiapi.guard';

@ApiTags('KaspiApi')
@Controller('kaspiapi')
export class KaspiapiController {
  constructor(private readonly kaspiapiService: KaspiapiService) {}

  @Get('')
  @UseGuards(IpAndMethodGuard)
  async request(
    @Query() requestKaspiDto: RequestKaspiDto,
  ): Promise<ResponseKaspiDto> {
    switch (requestKaspiDto.command) {
      case 'check':
        return this.kaspiapiService.check(
          requestKaspiDto as CheckRequestKaspiDto,
        );
      case 'pay':
        return this.kaspiapiService.pay(
          requestKaspiDto as unknown as PayRequestKaspiDto,
        );
      default:
        throw Error('Unexpected command argument');
    }
  }
}
