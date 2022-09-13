import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user.entities';
import { Repository } from 'typeorm';
import { GetUserQuery } from '../impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async execute(query: GetUserQuery): Promise<User[]> {
    return await this.userRepository.find();
  }
}
