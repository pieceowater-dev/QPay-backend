import { Test, TestingModule } from '@nestjs/testing';
import { KaspiapiController } from './kaspiapi.controller';
import { KaspiapiService } from './kaspiapi.service';

describe('KaspiapiController', () => {
  let controller: KaspiapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KaspiapiController],
      providers: [KaspiapiService],
    }).compile();

    controller = module.get<KaspiapiController>(KaspiapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
