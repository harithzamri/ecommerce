import { QueryBus, CommandBus, ICommand, IQuery } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CartResolver } from './cart.resolver';

describe('CartResolver', () => {
  let resolver: CartResolver;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartResolver,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CartResolver>(CartResolver);
    queryBus = module.get<QueryBus<IQuery>>(QueryBus);
    commandBus = module.get<CommandBus<ICommand>>(CommandBus);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('queryBus should be defined', () => {
    expect(queryBus).toBeDefined();
  });
});
