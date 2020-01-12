import { Repository, EntityRepository } from 'typeorm';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';
import * as DataLoader from 'dataloader';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  private loader: DataLoader<number, Place> = new DataLoader(async placeIds => {
    const places = await this.findByIds(placeIds as number[]);
    return places;
  });

  findByUserId = (userId: number) =>
    this.createQueryBuilder('place')
      .select('*')
      .where('place.userId = :userId', { userId })
      .orderBy('place.createdAt', 'DESC')
      .limit(5)
      .getRawMany();

  findById = (placeId: number) => this.loader.load(placeId);

  findVisitsById = (placeId: number, options: VisitOptions): Promise<Visit[]> =>
    this.createQueryBuilder('place')
      .innerJoin('place.visits', 'visit', 'visit.placeId = :placeId', {
        placeId
      })
      .take(options.limit)
      .skip(options.skip)
      .orderBy('visit.visitDate')
      .addOrderBy('visit.createdAt')
      .getRawMany();
}

interface VisitOptions {
  limit?: number;
  skip?: number;
}
