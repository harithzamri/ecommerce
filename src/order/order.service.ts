import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../cart/cart.service';
import { User } from '../user/user.entities';
import { Repository } from 'typeorm';
import { Order } from './order.entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private cartService: CartService,
  ) {}

  async order(user: string): Promise<any> {
    //find user existing order
    const usersOrder = await this.orderRepository.find({ relations: ['user'] });
    const userOrder = usersOrder.filter(
      (order) => order.user.name === user && order.pending === false,
    );

    //find user's cart items
    const cartItems = await this.cartService.getItemsInCart(user);
    const subTotal = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next);

    //get userId
    const userId = await this.userRepository.findOne({
      where: {
        name: user,
      },
    });

    //if users has an pending order - add item to the list of order
    const cart = await cartItems.map((item) => item.item);

    if (cart.length == 0) {
      throw new NotFoundException('cart not found');
    }

    if (userOrder.length === 0) {
      const newOrder = await this.orderRepository.create({ subTotal });
      newOrder.items = cart;
      newOrder.user = userId;
      return await this.orderRepository.save(newOrder);
    } else {
      const existingOrder = userOrder.map((item) => item);
      await this.orderRepository.update(existingOrder[0].id, {
        subTotal: existingOrder[0].subTotal + cart[0].price,
      });
      return { message: 'order modified' };
    }
  }
  //find orders based on the name
  async getOrders(name: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    // console.log(orders.filter((order) => order.user.name === name));
    return orders.filter((order) => order.user.name === name);
  }
}
