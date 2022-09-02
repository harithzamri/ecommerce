import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/cart.entities';
import { CartService } from '../cart/cart.service';
import { Product } from '../products/products.entities';
import { ProductsService } from '../products/products.service';
import { User } from '../user/user.entities';
import { Order } from './order.entities';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Cart, User])],
  providers: [OrderService, CartService, ProductsService, OrderResolver],
})
export class OrderModule {}
