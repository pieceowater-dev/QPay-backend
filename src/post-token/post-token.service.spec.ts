import { Test, TestingModule } from '@nestjs/testing';
import { PostTokenService } from './post-token.service';

describe('PostTokenService', () => {
  let service: PostTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTokenService],
    }).compile();

    service = module.get<PostTokenService>(PostTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
