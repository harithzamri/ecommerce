import { PaginateInput } from '../../dto/paginate.input';

export class GetProductQuery {
  constructor(public readonly pagination: PaginateInput) {}
}
