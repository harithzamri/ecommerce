import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user.entities';
import { Repository } from 'typeorm';
import { CreateUserImpl } from '../impl/create-user.query';

@CommandHandler(CreateUserImpl)
export class CreateUserHandler implements ICommandHandler<CreateUserImpl> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUserImpl): Promise<User> {
    const newUser = this.userRepository.create(command.createUserInput);
    return this.userRepository.save(newUser);
  }
}
