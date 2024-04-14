import { Injectable } from '@nestjs/common';
import { OnPayDto } from './dto/on-pay.dto';

@Injectable()
export class PostsWsService {
  onPay(onPayDto: OnPayDto) {
    return JSON.stringify(onPayDto);
  }
}
