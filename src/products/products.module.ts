import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entities';
import { GetProductHandler } from './queries/handler/get-product-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAProductHandler } from './queries/handler/get-a-product-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  providers: [
    ProductsService,
    ProductsResolver,
    GetProductHandler,
    GetAProductHandler,
  ],
})
export class ProductsModule {}
