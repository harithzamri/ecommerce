import { Field, InputType, Int } from '@nestjs/graphql';
import { Product } from '../products.entities';

@InputType()
export class CreateProductInput extends Product {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;
}
