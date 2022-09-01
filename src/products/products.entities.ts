import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cart } from '../cart/cart.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Field()
  @Column({
    name: 'name',
    nullable: false,
    default: '',
  })
  name: string;

  @Field()
  @Column({
    name: 'price',
    default: 0,
  })
  price: number;

  @Field()
  @Column({
    name: 'quantity',
    default: 0,
  })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Field((type) => [Cart], { nullable: true })
  @OneToMany(() => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: Cart[];
}
