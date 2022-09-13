import { CreateUserInput } from '../../dto/create-user.input';

export class CreateUserImpl {
  constructor(public readonly createUserInput: CreateUserInput) {}
}
