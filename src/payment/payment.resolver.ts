import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payment } from './payment.entities';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async checkout(
    @Args('orderId') orderId: number,
    @Args('userId') userId: number,
  ) {
    return this.paymentService.createCheckoutSession(orderId, userId);
  }
}
