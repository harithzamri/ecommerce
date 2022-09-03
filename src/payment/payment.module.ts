import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entities';
import { Payment } from './payment.entities';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { User } from '../user/user.entities';
import { UserService } from '../user/user.service';
import { Cart } from '../cart/cart.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment, User, Cart])],
  providers: [PaymentResolver, PaymentService, UserService],
})
export class PaymentModule {}
