import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Visit } from './visit.entity';
import { VisitInput } from './visit.types';
import { Place } from '../place/place.entity';
import { User } from '../user/user.entity';
import { Order } from './order.entity';

@Service()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async findById(id: number) {
    return this.visitRepository.findOne(id);
  }

  async createVisit(input: VisitInput, place: Place, user: User) {
    const orders = input.orders
      ? await Promise.all(
          input.orders.map(async title =>
            this.orderRepository.create({ title, user })
          )
        )
      : [];

    const visit = this.visitRepository.create({
      ...input,
      orders,
      place,
      placeId: place.id,
      user,
      userId: user.id
    });

    return await this.visitRepository.save(visit);
  }
}
