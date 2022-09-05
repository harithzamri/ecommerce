import { User } from '../user/user.entities';
import {
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/products.entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Cart {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  quantity: number;

  @Field((type) => Product, { nullable: true })
  @ManyToOne((type) => Product, (order) => order.id)
  @JoinColumn()
  item: Product;

  //   @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.name)
  @JoinColumn()
  user: User;
}
