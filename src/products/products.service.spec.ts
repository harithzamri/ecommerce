import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entities';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      PRODUCT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('productRepository should be fined', () => {
    expect(productRepository).toBeDefined();
  });

  describe('get all product', () => {
    it('should get all product', async () => {
      const products = await service.getAllProducts();
      expect(products);
    });
  });

  describe('get one product', () => {
    it('should only one product', async () => {
      const id = 1;
      const product = await service.findOne(1);
      expect(product);
    });
  });
});
