import { Inject, Injectable } from '@nestjs/common';
import { STRIPE_CLIENT } from '../stripe/constants';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/order.entities';
import { UserService } from '../user/user.service';
import { Cart } from '../cart/cart.entities';
import { Payment } from './payment.entities';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private userService: UserService,
  ) {}

  async createCheckoutSession(orderId: number, userId: number) {
    let order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    let user = await this.userService.findOne(userId);
    //get items to be display in stripe
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const cart = cartItems.filter((item) => item.user.name === user.name);
    const getItems = cart.map((item) => item.item.name);
    //create stripe session to checkout
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'myr',
            unit_amount: order.subTotal,
            product_data: {
              name: 'items',
            },
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return this.paymentRepository.save({
      user_id: userId,
      payment_id: session.id,
    });
  }
}
