import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entities';
import { CartService } from './cart.service';

@Resolver()
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Mutation((type) => Cart, { name: 'addToCart' })
  async addToCart(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
    @Args('name') name: string,
  ): Promise<void> {
    return await this.cartService.addToCart(productId, quantity, name);
  }

  @Query(() => [Cart])
  async getItemsInCart(@Args('name') name: string): Promise<Cart[]> {
    return await this.cartService.getItemsInCart(name);
  }

  @Mutation(() => Boolean)
  async deleteCart(@Args('id') id: number) {
    return this.cartService.deleteCart(id);
  }
}
