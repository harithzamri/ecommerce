import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { STRIPE_CLIENT } from '../stripe/constants';
import Stripe from 'stripe';
import { Order } from './order.entities';
import { OrderService } from './order.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery } from './queries/impl/get-order-queries';
import { CreateOrderCommand } from './commands/impl/create-order-command';

@Resolver()
export class OrderResolver {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Query((type) => [Order])
  async getOrder(@Args('username') user: string): Promise<Order[]> {
    return await this.queryBus.execute(new GetOrderQuery(user));
  }

  @Mutation((type) => Order, { name: 'createOrder' })
  async createOrder(@Args('username') user: string) {
    return this.commandBus.execute(new CreateOrderCommand(user));
  }

  // @Mutation((type) => Order, { name: 'createOrder' })
  // async createOrder(@Args('username') user: string) {
  //   return this.orderService.order(user);
  // }

  // @Query((type) => [Order])
  // async getOrder(@Args('username') user: string): Promise<Order[]> {
  //   return this.orderService.getOrders(user);
  // }
}
