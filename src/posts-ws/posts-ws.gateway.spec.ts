import { Test, TestingModule } from '@nestjs/testing';
import { PostsWsGateway } from './posts-ws.gateway';
import { PostsWsService } from './posts-ws.service';

describe('PostsWsGateway', () => {
  let gateway: PostsWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsWsGateway, PostsWsService],
    }).compile();

    gateway = module.get<PostsWsGateway>(PostsWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
