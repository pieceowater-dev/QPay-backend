import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import getPaginated from '../utils/paginated.list.parse';
import { PaginatedList } from '../utils/paginated.list';
import { DefaultFilter } from '../utils/default.filter';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postRepository.save(createPostDto);
  }

  async findAll(filter: DefaultFilter): Promise<PaginatedList<PostEntity>> {
    return await this.postRepository
      .findAndCount({
        where: {
          deleted: false,
        },
        take: filter?.pagination?.take ?? 25,
        skip: filter?.pagination?.skip ?? 0,
        order: {
          [filter?.sort?.field ?? 'id']: filter?.sort?.by ?? 'DESC',
        },
      })
      .then(getPaginated);
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.save({ ...updatePostDto, id });
  }

  async remove(id: number): Promise<PostEntity> {
    return await this.postRepository.remove({ id } as PostEntity);
  }
}
