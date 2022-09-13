import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart.entities';
import { Repository } from 'typeorm';
import { ShowCartQuery } from '../impl/show-cart-queries';

@QueryHandler(ShowCartQuery)
export class ShowCartHandler implements IQueryHandler<ShowCartQuery> {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(query: ShowCartQuery): Promise<Cart[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    return userCart.filter((item) => item.user.name === query.name);
  }
}
