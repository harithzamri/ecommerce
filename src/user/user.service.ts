import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  //create service
  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);

    return this.userRepository.save(newUser);
  }
  //find a user
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }
  //find all user
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
