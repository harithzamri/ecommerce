import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../payment.entities';
import { Repository } from 'typeorm';
import { GetClientSessionQuery } from '../impl/get-client-session-query';

@QueryHandler(GetClientSessionQuery)
export class GetClientSessionHandler
  implements IQueryHandler<GetClientSessionQuery>
{
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}
  async execute(query: GetClientSessionQuery): Promise<Payment> {
    const { userId } = query;
    let session = await this.paymentRepository.findOne({
      where: {
        user_id: userId,
      },
      order: {
        id: 'DESC',
      },
    });

    return session;
  }
}
