import { IQuery, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    queryBus = module.get<QueryBus<IQuery>>(QueryBus);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('queryBus should be defined', () => {
    expect(queryBus).toBeDefined();
  });
});
