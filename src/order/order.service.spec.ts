import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartService } from '../cart/cart.service';
import { User } from '../user/user.entities';
import { Repository } from 'typeorm';
import { Order } from './order.entities';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;
  let userRepository: Repository<User>;
  let cartService: CartService;

  const ORDER_REPOSITORY_TOKEN = getRepositoryToken(Order);
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn((x) => x),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: CartService,
          useValue: {
            getItemsInCart: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    orderRepository = module.get<Repository<Order>>(ORDER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be fined', () => {
    expect(userRepository).toBeDefined();
  });

  it('orderRepository should be fined', () => {
    expect(orderRepository).toBeDefined();
  });

  describe('getOrders', () => {
    it('get orders based on name', async () => {
      const result = [
        {
          id: 1,
          subTotal: 5100,
          pending: false,
        },
      ];
      const orders = await orderRepository.find({ relations: ['user'] });
    });
  });
});
