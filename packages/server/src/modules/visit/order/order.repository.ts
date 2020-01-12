import { Repository, EntityRepository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  findByVisitId = (visitId: number): Promise<Order[]> =>
    this.createQueryBuilder('order')
      .where('order.visitId = :visitId', { visitId })
      .getMany();
}
