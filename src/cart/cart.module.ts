import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products.entities';
import { User } from '../user/user.entities';
import { Cart } from './cart.entities';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User])],
  providers: [CartService, ProductsService, CartResolver],
})
export class CartModule {}
