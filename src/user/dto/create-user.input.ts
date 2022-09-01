import { Field, InputType } from '@nestjs/graphql';
import { User } from '../user.entities';

@InputType()
export class CreateUserInput extends User {
  @Field()
  name: string;

  @Field()
  password: string;
}
