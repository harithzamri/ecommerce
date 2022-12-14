import { QueryBus } from '@nestjs/cqrs';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { PaginateInput } from './dto/paginate.input';
import { Product } from './products.entities';
import { ProductsService } from './products.service';
import { GetAProductQuery } from './queries/impl/get-a-product-queries';
import { GetProductQuery } from './queries/impl/get-product-queries';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private queryBus: QueryBus) {}

  @Query(() => [Product])
  products(@Args('paginate') args?: PaginateInput): Promise<Product[]> {
    return this.queryBus.execute(new GetProductQuery(args));
  }
  // @Query(() => [Product])
  // products(): Promise<Product[]> {
  //   return this.productService.findAll();
  // }

  // @Mutation(() => Product)
  // createProduct(
  //   @Args('createProductInput') createProductInput: CreateProductInput,
  // ): Promise<Product> {
  //   return this.productService.createProduct(createProductInput);
  // }

  // @Query(() => Number, { name: 'count' })
  // async getCount(): Promise<number> {
  //   return this.productService.getCount();
  // }

  // @Query(() => [Product], { name: 'products' })
  // products(@Args('paginate') args?: PaginateInput): Promise<Product[]> {
  //   return this.productService.getFilteredProducts(args);
  // }

  @Query(() => Product, { name: 'getAProduct' })
  fetchAProduct(@Args('id') id: number) {
    return this.queryBus.execute(new GetAProductQuery(id));
  }
}
