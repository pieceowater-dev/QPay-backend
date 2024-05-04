import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { DefaultFilter } from '../utils/default.filter';
import { PaginatedList } from '../utils/paginated.list';
import getPaginated from '../utils/paginated.list.parse';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('PAYMENTS_REPOSITORY')
    private paymentsEntityRepository: Repository<PaymentsEntity>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentsEntity> {
    return await this.paymentsEntityRepository.save(createPaymentDto);
  }

  async findPaginatedMany(
    filter: DefaultFilter,
  ): Promise<PaginatedList<PaymentsEntity>> {
    return await this.paymentsEntityRepository
      .findAndCount({
        take: filter?.pagination?.take ?? 25,
        skip: filter?.pagination?.skip ?? 0,
        order: {
          [filter?.sort?.field ?? 'id']: filter?.sort?.by ?? 'DESC',
        },
      })
      .then(getPaginated);
  }

  async findOne(id: number): Promise<PaymentsEntity> {
    return await this.paymentsEntityRepository.findOneBy({ id });
  }
}
