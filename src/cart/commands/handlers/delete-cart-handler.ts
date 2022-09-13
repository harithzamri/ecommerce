import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart.entities';
import { Repository } from 'typeorm';
import { DeleteCartCommand } from '../impl/delete-cart-command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteCartCommand)
export class DeleteCartHandler implements ICommandHandler<DeleteCartCommand> {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(command: DeleteCartCommand): Promise<boolean> {
    const { id } = command;
    const cart = await this.cartRepository.find({
      where: {
        id,
      },
    });

    if (!cart) throw new NotFoundException('cart not found');

    await this.cartRepository.delete({
      id,
    });

    return true;
  }
}
