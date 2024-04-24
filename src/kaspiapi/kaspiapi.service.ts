import { Injectable } from '@nestjs/common';
import { ResponseKaspiDto } from './dto/response.kaspi.dto';
import { RequestKaspiDto } from './dto/request.kaspi.dto';

@Injectable()
export class KaspiapiService {
  check(createKaspiapiDto: RequestKaspiDto): ResponseKaspiDto {
    return {
      comment: '',
      sum: createKaspiapiDto.sum,
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result: '',
    };
  }

  pay(createKaspiapiDto: RequestKaspiDto): ResponseKaspiDto {
    return {
      comment: '',
      sum: createKaspiapiDto.sum,
      pry_txn_id: createKaspiapiDto.txn_id,
      txn_id: createKaspiapiDto.txn_id,
      result: '',
    };
  }
}
