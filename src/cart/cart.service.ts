import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { Cart } from './cart.entities';
import { User } from '../user/user.entities';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  async addToCart(
    productId: number,
    quantity: number,
    user: string,
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productsService.findOne(productId);
    const userid = await this.userRepository.findOne({
      where: {
        name: user,
      },
    });

    //Confirm the product exists.
    if (product) {
      //confirm if user has item in cart
      const cart = cartItems.filter(
        (item) => item.item.id === productId && item.user.name === user,
      );
      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.item = product;
        newItem.user = userid;

        return await this.cartRepository.save(newItem);
      } else {
        //Update the item quantity
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].total * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }
  //get all items in cart based on the name
  async getItemsInCart(name: string): Promise<Cart[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    return await userCart.filter((item) => item.user.name === name);
  }

  async deleteCart(id: number): Promise<Boolean> {
    await this.cartRepository.delete({
      id,
    });

    return true;
  }
}
