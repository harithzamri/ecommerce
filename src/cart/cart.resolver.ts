import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
