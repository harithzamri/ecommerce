import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../order/order.entities';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entities';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneOrFail: jest.fn((x) => x),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be fined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      await service.createUser({
        name: 'harith',
        email: 'harith123',
        password: '123',
        id: 0,
        cart: [],
        order: new Order(),
      });
      expect(userRepository.create).toHaveBeenCalled();
    });
  });

  describe('get user', () => {
    it('should get all user', async () => {
      await service.findAllUser();
    });
  });

  describe('getOneandFail', () => {
    it('should get one id or fail', async () => {
      const id = 1;
      await service.findOne(id);
    });
  });
});
