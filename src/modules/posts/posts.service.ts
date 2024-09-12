import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Any, ILike, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import getPaginated from '../../utils/pagination/paginated.list.parse';
import { PaginatedList } from '../../utils/pagination/paginated.list';
import { DefaultFilter } from '../../utils/default/default.filter';
import { UserRoles } from '../users/entities/user.entity';
import { TokenPayload } from '../../authorization/auth/interfaces/token.payload';
import { PostsUsersAccessService } from '../posts-users-access/posts-users-access.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<PostEntity>,
    private readonly postsUsersAccessService: PostsUsersAccessService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    user: TokenPayload,
  ): Promise<PostEntity> {
    return await this.postRepository
      .save(createPostDto)
      .then(async (result) => {
        if (user.role === UserRoles.MANAGER) {
          await this.postsUsersAccessService.create([
            { user: user.id, post: result.id },
          ]);
        }
        return result;
      });
  }

  async findAll(
    user: TokenPayload,
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

  async findOne(id: number): Promise<PostEntity | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async findOneOrFail(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneByOrFail({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: TokenPayload) {
    if (
      user.role === UserRoles.ADMINISTRATOR ||
      (await this.postsUsersAccessService.checkAccess(user.id, id)) !== null
    ) {
      return await this.postRepository.save({ ...updatePostDto, id });
    }
    throw new UnauthorizedException();
  }
}
