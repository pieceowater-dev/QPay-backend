import { Inject, Injectable } from '@nestjs/common';
import { CreatePostsUsersAccessDto } from './dto/create-posts-users-access.dto';
import { UpdatePostsUsersAccessDto } from './dto/update-posts-users-access.dto';
import { PostsUsersAccess } from './entities/posts-users-access.entity';
import { Equal, Repository } from 'typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { UserEntity } from '../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserAccessByPostDto } from './dto/update-user-access-by-post.dto';

@Injectable()
export class PostsUsersAccessService {
  constructor(
    @Inject('POST_USER_ACCESS_REPOSITORY')
    private postsUsersAccessRepository: Repository<PostsUsersAccess>,
  ) {}

  async create(
    createPostsUsersAccessDto: CreatePostsUsersAccessDto[],
  ): Promise<PostsUsersAccess[]> {
    const entities: Array<{
      user: UserEntity;
      post: PostEntity;
    }> = createPostsUsersAccessDto.map((e) => ({
      user: plainToInstance(UserEntity, e.user),
      post: plainToInstance(PostEntity, e.post),
    }));
    return await this.postsUsersAccessRepository.save(entities);
  }

  async findOneByUser(id: number): Promise<PostsUsersAccess[]> {
    return await this.postsUsersAccessRepository.find({
      relations: ['post'],
      where: { user: Equal(id) },
    });
  }

  async findOneByPost(id: number): Promise<PostsUsersAccess[]> {
    return await this.postsUsersAccessRepository.find({
      relations: ['user'],
      where: { post: Equal(id) },
    });
  }

  async update(
    updatePostsUsersAccessDto: UpdatePostsUsersAccessDto[],
  ): Promise<PostsUsersAccess[]> {
    const entities: Array<{
      id: number;
      user: UserEntity;
      post: PostEntity;
    }> = updatePostsUsersAccessDto.map((e) => ({
      id: e.id,
      user: plainToInstance(UserEntity, e.user),
      post: plainToInstance(PostEntity, e.post),
    }));
    return await this.postsUsersAccessRepository.save(entities);
  }

  async updateUserAccessByPost(
    post: number,
    updateUserAccessByPostDto: UpdateUserAccessByPostDto,
  ): Promise<string> {
    return await this.postsUsersAccessRepository.manager.transaction(
      async (em) => {
        await em
          .getRepository(PostsUsersAccess)
          .createQueryBuilder()
          .delete()
          .where({
            post,
          })
          .execute();

        await em
          .getRepository(PostsUsersAccess)
          .createQueryBuilder()
          .insert()
          .values(
            updateUserAccessByPostDto.users.map((user) => ({
              user: { id: user },
              post: { id: post },
            })),
          )
          .execute();

        return 'OK';
      },
    );
  }

  async checkAccess(
    user: number,
    post: number,
  ): Promise<PostsUsersAccess | null> {
    return await this.postsUsersAccessRepository.findOneBy({
      user: {
        id: user,
      },
      post: {
        id: post,
      },
    });
  }

  async delete(ids: number[]): Promise<'OK'> {
    return await this.postsUsersAccessRepository
      .createQueryBuilder()
      .delete()
      .whereInIds(ids)
      .execute()
      .then((e) => {
        console.log(e);
        return 'OK';
      });
  }
}
