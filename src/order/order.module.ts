import { Controller, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/cart.entities';
import { CartService } from '../cart/cart.service';
import { Product } from '../products/products.entities';
import { ProductsService } from '../products/products.service';
import { User } from '../user/user.entities';
import { CreateOrderHandler } from './commands/handler/create-order-handler';
import { Order } from './order.entities';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { GetOrderHandler } from './queries/handler/get-order-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Cart, User]), CqrsModule],
  providers: [
    OrderService,
    CartService,
    ProductsService,
    OrderResolver,
    GetOrderHandler,
    CreateOrderHandler,
  ],
})
export class OrderModule {}
