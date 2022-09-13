import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../../../cart/cart.service';
import { Order } from '../../order.entities';
import { User } from '../../../user/user.entities';
import { Repository } from 'typeorm';
import { CreateOrderCommand } from '../impl/create-order-command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private cartService: CartService,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    const { name } = command;
    //find user existing order
    const usersOrder = await this.orderRepository.find({ relations: ['user'] });
    const userOrder = usersOrder.filter(
      (order) => order.user.name === name && order.pending === false,
    );

    //find user's cart items
    const cartItems = await this.cartService.getItemsInCart(name);
    const subTotal = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next);

    //get userId
    const userId = await this.userRepository.findOne({
      where: {
        name,
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
}
