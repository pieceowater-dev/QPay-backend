import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import getPaginated from '../utils/paginated.list.parse';
import { PaginatedList } from '../utils/paginated.list';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.save(createPostDto);
  }

  async findAll(): Promise<PaginatedList<Post>> {
    return await this.postRepository.findAndCount().then(getPaginated);
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.save({ ...updatePostDto, id });
  }

  async remove(id: number): Promise<Post> {
    return await this.postRepository.remove({ id } as Post);
  }
}
