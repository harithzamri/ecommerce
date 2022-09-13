import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entities';
import { GetProductHandler } from './queries/handler/get-product-handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  providers: [ProductsService, ProductsResolver, GetProductHandler],
})
export class ProductsModule {}
