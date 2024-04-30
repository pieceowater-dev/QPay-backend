import { Controller, Get, Query } from '@nestjs/common';
import { KaspiapiService } from './kaspiapi.service';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { CheckRequestKaspiDto } from './dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from './dto/pay.request.kaspi.dto';
import { KaspiapiPipeTransform } from './kaspiapi.pipe.transform';

// TODO настроить cors на GET 194.187.247.152
// Интерфейс должен принимать запросы по протоколу HTTPS с IP-адресов подсети: 194.187.247.152
// Интерфейс должен обрабатывать параметры, передаваемые системой методом GET
// Обмен информацией ведется в режиме запрос-ответ, при этом скорость ответа не должна превышать 15 секунд,
// в противном случае система разрывает соединение по таймауту.
// Если предполагаемое количество платежей за услуги подключаемого провайдера,
// ожидается интенсивным (до 10 платежей в минуту и более), необходимо,
// чтобы интерфейс поддерживал многопоточную коммуникацию до 10-15 одновременных соединений.

@Controller('kaspiapi')
export class KaspiapiController {
  constructor(private readonly kaspiapiService: KaspiapiService) {}

  @Get('')
  request(
    @Query(KaspiapiPipeTransform)
    requestKaspiDto: CheckRequestKaspiDto | PayRequestKaspiDto,
  ): ResponseKaspiDto {
    switch (requestKaspiDto.command) {
      case 'check':
        return this.kaspiapiService.check(
          requestKaspiDto as CheckRequestKaspiDto,
        );
      case 'pay':
        return this.kaspiapiService.pay(requestKaspiDto as PayRequestKaspiDto);
      default:
        throw Error('Unexpected command argument');
    }
  }
}
