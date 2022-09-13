import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart.entities';
import { ProductsService } from '../../../products/products.service';
import { User } from '../../../user/user.entities';
import { Repository } from 'typeorm';
import { CreateCartCommands } from '../impl/create-cart-commands';

@CommandHandler(CreateCartCommands)
export class CreateCartHandler implements ICommandHandler<CreateCartCommands> {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  async execute(command: CreateCartCommands): Promise<any> {
    const { productId, quantity, name } = command;

    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productsService.findOne(productId);
    const userid = await this.userRepository.findOne({
      where: {
        name,
      },
    });

    //Confirm the product exists.
    if (product) {
      //confirm if user has item in cart
      const cart = cartItems.filter(
        (item) => item.item.id === productId && item.user.name === name,
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
}
