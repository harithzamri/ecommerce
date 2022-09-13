import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entities';
import { UserService } from './user.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs/dist';
import { GetUserQuery } from './queries/impl/get-user.query';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserImpl } from './commands/impl/create-user.query';

@Resolver(() => User)
export class UserResolver {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Query(() => [User], { name: 'getAllUser' })
  getAllUser(): Promise<User[]> {
    return this.queryBus.execute(new GetUserQuery());
  }

  @Mutation(() => User)
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.commandBus.execute(new CreateUserImpl(createUserInput));
  }

  // @Mutation(() => User)
  // createUser(
  //   @Args('createUserInput') createUserInput: CreateUserInput,
  // ): Promise<User> {
  //   return this.userService.createUser(createUserInput);
  // }

  // @Query(() => User, { name: 'getAUser' })
  // getAUSer(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Query(() => [User], { name: 'getAllUser' })
  // getAllUser(): Promise<User[]> {
  //   return this.userService.findAllUser();
  // }
}
