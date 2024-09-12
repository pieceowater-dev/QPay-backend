import { Test, TestingModule } from '@nestjs/testing';
import { PostsUsersAccessService } from './posts-users-access.service';

describe('PostsUsersAccessService', () => {
  let service: PostsUsersAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsUsersAccessService],
    }).compile();

    service = module.get<PostsUsersAccessService>(PostsUsersAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
