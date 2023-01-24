import { Test, TestingModule } from '@nestjs/testing';
import { TwittesResolver } from './twittes.resolver';
import { TwittesService } from './twittes.service';

describe('TwittesResolver', () => {
  let resolver: TwittesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwittesResolver, TwittesService],
    }).compile();

    resolver = module.get<TwittesResolver>(TwittesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
