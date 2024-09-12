import { Test, TestingModule } from '@nestjs/testing';
import { PostsUsersAccessController } from './posts-users-access.controller';
import { PostsUsersAccessService } from './posts-users-access.service';

describe('PostsUsersAccessController', () => {
  let controller: PostsUsersAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsUsersAccessController],
      providers: [PostsUsersAccessService],
    }).compile();

    controller = module.get<PostsUsersAccessController>(PostsUsersAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
