import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { PaginateInput } from './dto/paginate.input';
import { Product } from './products.entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  createProduct(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductInput); // newProduct = new Product();

    return this.productsRepository.save(newProduct); //INSERT NEW PRODUCT
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsRepository.find();

    return products;
  }

  async getFilteredProducts(
    filterProductDTO: PaginateInput,
  ): Promise<Product[]> {
    const { take, skip, search, sort } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter((products) => products.name.includes(search));

      return products;
    } else {
      return this.productsRepository.find({
        take,
        skip,
        order: {
          //@ts-ignore
          price: sort,
        },
      });
    }
  }

  getCount(): Promise<number> {
    return this.productsRepository.count();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        id,
      },
    });
  }
}
