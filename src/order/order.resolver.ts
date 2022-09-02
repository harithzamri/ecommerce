import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Order } from './order.entities';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation((type) => Order, { name: 'createOrder' })
  async createOrder(@Args('username') user: string) {
    return this.orderService.order(user);
  }

  @Query((type) => Order)
  async getOrder(@Args('username') user: string) {
    return this.orderService.getOrders(user);
  }
}
