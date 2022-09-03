import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { STRIPE_CLIENT } from '../stripe/constants';
import Stripe from 'stripe';
import { Order } from './order.entities';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  @Mutation((type) => Order, { name: 'createOrder' })
  async createOrder(@Args('username') user: string) {
    return this.orderService.order(user);
  }

  @Query((type) => Order)
  async getOrder(@Args('username') user: string) {
    return this.orderService.getOrders(user);
  }
}
