import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entities';
import { Payment } from './payment.entities';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { User } from '../user/user.entities';
import { UserService } from '../user/user.service';
import { Cart } from '../cart/cart.entities';
import { GetClientSessionHandler } from './queries/handler/get-client-session-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSessionHandler } from './command/handler/create-session-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment, User, Cart]), CqrsModule],
  providers: [
    PaymentResolver,
    PaymentService,
    UserService,
    GetClientSessionHandler,
    CreateSessionHandler,
  ],
})
export class PaymentModule {}
