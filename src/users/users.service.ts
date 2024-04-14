import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginatedList } from '../utils/paginated.list';
import getPaginated from '../utils/paginated.list.parse';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      select: ['id', 'email', 'name', 'password'],
      where: { email },
    });
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  async findMany(): Promise<UserEntity[] | undefined> {
    return await this.userRepository.find();
  }

  async findPaginatedMany(): Promise<PaginatedList<UserEntity>> {
    return await this.userRepository.findAndCount().then(getPaginated);
  }

  async save(user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(plainToInstance(UserEntity, user));
  }
}
