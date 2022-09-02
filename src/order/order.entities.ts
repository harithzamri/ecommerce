import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field(() => Order)
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Field()
  @Column()
  subTotal: number;

  @Field()
  @Column({ default: false })
  pending: boolean;

  @OneToMany((type) => Product, (item) => item.id)
  items: Product[];

  @OneToOne((type) => User, (user) => user.name)
  @JoinColumn()
  user: User;
}
