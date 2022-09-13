import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSessionCommand } from './command/impl/create-session-command';
import { Payment } from './payment.entities';
import { PaymentService } from './payment.service';
import { GetClientSessionQuery } from './queries/impl/get-client-session-query';

@Resolver()
export class PaymentResolver {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Query(() => Payment)
  async getClientSecret(@Args('userId') userId: number) {
    return this.queryBus.execute(new GetClientSessionQuery(userId));
  }

  @Mutation(() => Payment)
  async checkout(
    @Args('orderId') orderId: number,
    @Args('userId') userId: number,
  ) {
    return this.commandBus.execute(new CreateSessionCommand(orderId, userId));
  }

  // @Mutation(() => Payment)
  // async checkout(
  //   @Args('orderId') orderId: number,
  //   @Args('userId') userId: number,
  // ) {
  //   return this.paymentService.createCheckoutSession(orderId, userId);
  // }

  // @Query(() => Payment)
  // async getClientSecret(@Args('userId') userId: number) {
  //   return this.paymentService.getSession(userId);
  // }
}
