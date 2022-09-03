import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Cart } from '../cart/cart.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entities';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Field()
  @Column({
    name: 'name',
  })
  name: string;

  @Field()
  @Column({
    name: 'email',
  })
  email: string;

  @Field()
  @Column({
    name: 'password',
  })
  password: string;

  @Field((type) => Cart, { nullable: true })
  @OneToMany((type) => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: Cart[];

  @OneToOne(() => Order, (order) => order.id)
  @JoinColumn()
  order: Order;
}
