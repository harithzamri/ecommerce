import { Test, TestingModule } from '@nestjs/testing';
import { Cart } from '../cart/cart.entities';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { PaymentService } from './payment.service';
import { Order } from '../order/order.entities';
import { Payment } from './payment.entities';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entities';

describe('PaymentService', () => {
  let service: PaymentService;
  let cartRepository: Repository<Cart>;
  let orderRepository: Repository<Order>;
  let paymentRepository: Repository<Payment>;
  let userService: UserService;
  let stripe: Stripe;

  const CART_REPOSITORY_TOKEN = getRepositoryToken(Cart);
  const ORDER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const PAYMENT_REPOSITORY_TOKEN = getRepositoryToken(Payment);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: CART_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: ORDER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: PAYMENT_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: Stripe,
          useValue: {
            paymentIntents: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getSession', () => {
  //   it('get session based on userId', () => {
  //     const id = 1;
  //     let session = service.getSession(id);
  //     expect(session);
  //   });
  // });
});
