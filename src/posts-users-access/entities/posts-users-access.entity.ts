import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('posts-users-access')
export class PostsUsersAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (p) => p.id)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (u) => u.id)
  user: UserEntity;
}
