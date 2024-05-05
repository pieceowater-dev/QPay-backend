import { DataSource } from 'typeorm';
import { PostsUsersAccess } from './entities/posts-users-access.entity';

export const postsUsersAccessProvider = [
  {
    provide: 'POST_USER_ACCESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PostsUsersAccess),
    inject: ['DATA_SOURCE'],
  },
];
