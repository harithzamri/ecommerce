import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../products.entities';
import { Repository } from 'typeorm';
import { GetProductQuery } from '../impl/get-product-queries';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  async execute(query: GetProductQuery): Promise<any> {
    const { skip, take, search, sort } = query.pagination;

    let products = await this.getAllProducts();

    if (search) {
      products = products.filter((products) => products.name.includes(search));

      return products;
    } else {
      return this.productsRepository.find({
        take,
        skip,
        order: {
          //@ts-ignore
          price: sort,
        },
      });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsRepository.find();

    return products;
  }
}
