import { Repository, EntityRepository } from 'typeorm';
import { Rate } from './rate.entity';

@EntityRepository(Rate)
export class RateRepository extends Repository<Rate> {
  findByVisitId = (visitId: number) =>
    this.createQueryBuilder('rate')
      .where('rate.visitId = :visitId', {
        visitId
      })
      .getMany();
}
