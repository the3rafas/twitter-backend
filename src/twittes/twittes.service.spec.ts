import { Test, TestingModule } from '@nestjs/testing';
import { TwittesService } from './twittes.service';

describe('TwittesService', () => {
  let service: TwittesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwittesService],
    }).compile();

    service = module.get<TwittesService>(TwittesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
