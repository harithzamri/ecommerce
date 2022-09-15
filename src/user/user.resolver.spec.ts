import { CommandBus, ICommand, IQuery, ofType, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
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

    resolver = module.get<UserResolver>(UserResolver);
    queryBus = module.get<QueryBus<IQuery>>(QueryBus);
    commandBus = module.get<CommandBus<ICommand>>(CommandBus);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('queryBus should be defined', () => {
    expect(queryBus).toBeDefined();
  });

  describe('findAllUser', () => {
    it('should return all user', async () => {
      await resolver.getAllUser();
    });
  });
});
