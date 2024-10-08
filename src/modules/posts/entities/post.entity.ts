import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostsUsersAccess } from '../../posts-users-access/entities/posts-users-access.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  bin: string;

  @Column({ type: 'bigint', default: () => 'ROUND(EXTRACT(EPOCH FROM NOW()))' })
  created: string;

  @Column({ type: 'boolean', default: false })
  stopped: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @OneToMany(() => PostsUsersAccess, (pua) => pua.post)
  posts: PostsUsersAccess;
}
