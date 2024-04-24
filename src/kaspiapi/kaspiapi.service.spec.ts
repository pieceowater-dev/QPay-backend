import { Test, TestingModule } from '@nestjs/testing';
import { KaspiapiService } from './kaspiapi.service';

describe('KaspiapiService', () => {
  let service: KaspiapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KaspiapiService],
    }).compile();

    service = module.get<KaspiapiService>(KaspiapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
