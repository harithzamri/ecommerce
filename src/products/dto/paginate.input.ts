import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PaginateInput {
  @Field({ nullable: true, defaultValue: 0 })
  @Min(0)
  skip?: number;

  @Field({ nullable: true, defaultValue: 10 })
  @Min(0)
  @Max(0)
  take?: number;

  @Field({ nullable: true, defaultValue: '' })
  search?: string;

  @Field({ nullable: true, defaultValue: 'asc' })
  sort?: string;
}
