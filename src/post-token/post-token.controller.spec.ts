import { Test, TestingModule } from '@nestjs/testing';
import { PostTokenController } from './post-token.controller';
import { PostTokenService } from './post-token.service';

describe('PostTokenController', () => {
  let controller: PostTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTokenController],
      providers: [PostTokenService],
    }).compile();

    controller = module.get<PostTokenController>(PostTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
