import { Test, TestingModule } from '@nestjs/testing';
import { PostsWsService } from './posts-ws.service';

describe('PostsWsService', () => {
  let service: PostsWsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsWsService],
    }).compile();

    service = module.get<PostsWsService>(PostsWsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
