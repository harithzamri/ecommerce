import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../products/products.entities';
import { User } from '../user/user.entities';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subTotal: number;

  @Field()
  @Column({ default: false })
  pending: boolean;

  @Field((type) => Product, { nullable: true })
  @OneToMany((type) => Product, (item) => item.id)
  items: Product[];

  @Field((type) => User, { nullable: true })
  @OneToOne((type) => User, (user) => user.name)
  @JoinColumn()
  user: User;
}
