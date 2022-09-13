import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../order.entities';
import { Repository } from 'typeorm';
import { GetOrderQuery } from '../impl/get-order-queries';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
  async execute(query: GetOrderQuery): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    return orders.filter((order) => order.user.name === query.name);
  }
}
