import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../products.entities';
import { Repository } from 'typeorm';
import { GetAProductQuery } from '../impl/get-a-product-queries';

@QueryHandler(GetAProductQuery)
export class GetAProductHandler implements IQueryHandler<GetAProductQuery> {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  execute(query: GetAProductQuery): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        id: query.id,
      },
    });
  }
}
