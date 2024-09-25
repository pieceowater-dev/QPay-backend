import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ILike, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import getPaginated from '../../utils/pagination/paginated.list.parse';
import { PaginatedList } from '../../utils/pagination/paginated.list';
import { DefaultFilter } from '../../utils/default/default.filter';
import { UserRoles } from '../users/entities/user.entity';
import { TokenPayload } from '../../authorization/auth/interfaces/token.payload';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postRepository.save(createPostDto);
  }

  async findAll(
    user: TokenPayload,
    filter: DefaultFilter,
  ): Promise<PaginatedList<PostEntity>> {
    return await this.postRepository
      .findAndCount({
        relations: ['posts'],
        where: {
          name:
            filter.search != null
              ? ILike(`%${filter.search ?? ''}%`)
              : undefined,
          deleted: false,
          posts: {
            user: {
              id: user.role === UserRoles.ADMINISTRATOR ? undefined : user.id,
            },
          },
        },
        take: filter?.pagination?.take ?? 25,
        skip: filter?.pagination?.skip ?? 0,
        order: {
          [filter?.sort?.field ?? 'id']: filter?.sort?.by ?? 'DESC',
        },
      })
      .then(getPaginated);
  }

  async findOne(id: number): Promise<PostEntity | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async findOneOrFail(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneByOrFail({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.save({ ...updatePostDto, id });
  }
}
