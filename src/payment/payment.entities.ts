import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Payment {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Field({ nullable: true })
  @Column({
    name: 'userId',
    nullable: true,
  })
  user_id: number;

  @Field()
  @Column({ name: 'paymentID' })
  payment_id: string;
}
