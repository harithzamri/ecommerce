import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetUserHandler } from './queries/handler/get-user.handler';
import { User } from './user.entities';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [UserService, UserResolver, GetUserHandler, CreateUserHandler],
})
export class UserModule {}
