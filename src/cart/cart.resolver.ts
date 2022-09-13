import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entities';
import { CartService } from './cart.service';
import { CreateCartCommands } from './commands/impl/create-cart-commands';
import { DeleteCartCommand } from './commands/impl/delete-cart-command';
import { ShowCartQuery } from './queries/impl/show-cart-queries';

@Resolver()
export class CartResolver {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Query(() => [Cart])
  async getItemsInCart(@Args('name') name: string): Promise<Cart[]> {
    return await this.queryBus.execute(new ShowCartQuery(name));
  }

  @Mutation((type) => Cart, { name: 'addToCart' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async addToCart(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
    @Args('name') name: string,
  ): Promise<void> {
    return await this.commandBus.execute(
      new CreateCartCommands(productId, quantity, name),
    );
  }

  @Mutation(() => Boolean)
  async deleteCart(@Args('id') id: number) {
    return this.commandBus.execute(new DeleteCartCommand(id));
  }

  // @Mutation((type) => Cart, { name: 'addToCart' })
  // async addToCart(
  //   @Args('productId') productId: number,
  //   @Args('quantity') quantity: number,
  //   @Args('name') name: string,
  // ): Promise<void> {
  //   return await this.cartService.addToCart(productId, quantity, name);
  // }

  // @Query(() => [Cart])
  // async getItemsInCart(@Args('name') name: string): Promise<Cart[]> {
  //   return await this.cartService.getItemsInCart(name);
  // }

  // @Mutation(() => Boolean)
  // async deleteCart(@Args('id') id: number) {
  //   return this.cartService.deleteCart(id);
  // }
}
