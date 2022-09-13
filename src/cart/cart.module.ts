import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products.entities';
import { User } from '../user/user.entities';
import { Cart } from './cart.entities';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { ShowCartHandler } from './queries/handler/show-cart-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User]), CqrsModule],
  providers: [CartService, ProductsService, CartResolver, ShowCartHandler],
})
export class CartModule {}
