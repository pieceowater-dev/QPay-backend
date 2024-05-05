import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Any, ILike, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import getPaginated from '../utils/paginated.list.parse';
import { PaginatedList } from '../utils/paginated.list';
import { DefaultFilter } from '../utils/default.filter';
import { UserRoles } from '../users/entities/user.entity';

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
    user: any,
    filter: DefaultFilter,
  ): Promise<PaginatedList<PostEntity>> {
    return await this.postRepository
      .findAndCount({
        relations: ['posts'],
        where: {
          name: ILike(`%${filter.search ?? ''}%`),
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

  async findByIds(ids: number[]): Promise<PostEntity[]> {
    return await this.postRepository.findBy({ id: Any(ids) });
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.save({ ...updatePostDto, id });
  }
}
