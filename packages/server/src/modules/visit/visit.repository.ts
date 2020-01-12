import { Repository, EntityRepository } from 'typeorm';
import { Visit } from './visit.entity';
import * as DataLoader from 'dataloader';

@EntityRepository(Visit)
export class VisitRepository extends Repository<Visit> {
  private countLoader: DataLoader<number, number> = new DataLoader(
    async placeIds => {
      const counts = await this.getVisitCountByPlaceIds(placeIds);

      const map = new Map();
      counts.forEach(({ count, placeId }) => map.set(placeId, parseInt(count)));

      const mapped = placeIds.map(placeId => map.get(placeId) || 0);
      return mapped;
    }
  );

  getVisitCountByPlaceId = (placeId: number) => this.countLoader.load(placeId);

  getVisitCountByPlaceIds = (placeIds: readonly number[]) =>
    this.createQueryBuilder('visit')
      .select('COUNT(visit.id), visit.placeId')
      .where('visit.placeId IN (:...placeIds)', { placeIds })
      .groupBy('visit.placeId')
      .getRawMany();
}
