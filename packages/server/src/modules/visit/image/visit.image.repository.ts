import { Repository, EntityRepository } from 'typeorm';
import { VisitImage } from './visit.image.entity';

@EntityRepository(VisitImage)
export class VisitImageRepository extends Repository<VisitImage> {
  findByVisitId = (visitId: number): Promise<VisitImage[]> =>
    this.createQueryBuilder('visitImage')
      .where('visitImage.visitId = :visitId', { visitId })
      .leftJoin('visitImage.orders', 'order')
      .getMany();
}
