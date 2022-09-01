import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { PaginateInput } from './dto/paginate.input';
import { Product } from './products.entities';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  // @Query(() => [Product])
  // products(): Promise<Product[]> {
  //   return this.productService.findAll();
  // }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.createProduct(createProductInput);
  }

  @Query(() => Number, { name: 'count' })
  async getCount(): Promise<number> {
    return this.productService.getCount();
  }

  @Query(() => [Product], { name: 'products' })
  products(@Args('paginate') args?: PaginateInput): Promise<Product[]> {
    return this.productService.getFilteredProducts(args);
  }

  @Query(() => Product, { name: 'getAProduct' })
  fetchAProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }
}
