import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entities';
import { Repository } from 'typeorm';
import { CartService } from './cart.service';
import { Cart } from './cart.entities';
import { ProductsService } from '../products/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CartService', () => {
  let service: CartService;
  let userRepository: Repository<User>;
  let cartRepository: Repository<Cart>;
  let productService: ProductsService;

  const CART_REPOSITORY_TOKEN = getRepositoryToken(Cart);
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CART_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<Cart>>(CART_REPOSITORY_TOKEN);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be fined', () => {
    expect(userRepository).toBeDefined();
  });

  it('cartRepository should be fined', () => {
    expect(cartRepository).toBeDefined();
  });

  // describe('get all cart', () => {
  //   it('get cart based on name', async () => {
  //     const name = 'abu';
  //     const cart = service.getItemsInCart(name);
  //     expect(cart);
  //   });
  // });

  describe('delete cart', () => {
    it('delete cart basedon userId', async () => {
      const id = 1;
      let deleteCart = await service.deleteCart(id);
      expect(deleteCart);
    });
  });
});
