import * as DataLoader from 'dataloader';
import { PageOptions } from '../../graphql/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { Place } from './place.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  private loader: DataLoader<number, Place> = new DataLoader(async placeIds => {
    const places = await this.findByIds(placeIds as number[]);

    const map = new Map<number, Place>();
    places.forEach(place => map.set(place.id, place));
    const mapped = placeIds.map(placeId => map.get(placeId) as Place);

    return mapped;
  });

  private scoreLoader: DataLoader<number, number | null> = new DataLoader(
    async placeIds => {
      const scores = await this.getAverageScoreByIds(placeIds);

      const map = new Map<number, number | null>();
      scores.forEach(({ round, placeid }) => map.set(placeid, round));
      const mapped = placeIds.map(placeId => map.get(placeId) as number | null);

      return mapped;
    }
  );

  findByUserId = (userId: number, { page, limit }: PageOptions) =>
    this.createQueryBuilder('place')
      .where('place.userId = :userId', { userId })
      .orderBy('place.createdAt', 'DESC')
      .take(limit)
      .skip(page * limit)
      .getMany();

  findById = (placeId: number) => this.loader.load(placeId);

  getAverageScoreById = (placeId: number) => this.scoreLoader.load(placeId);

  getAverageScoreByIds = (
    placeIds: readonly number[]
  ): Promise<AverageScore[]> =>
    this.createQueryBuilder('place')
      .select('ROUND(AVG("visit"."score")::numeric, 1), place.id AS placeId')
      .leftJoin('place.visits', 'visit', 'visit.placeId = place.id')
      .where('place.id IN (:...placeIds)', { placeIds })
      .groupBy('place.id')
      .getRawMany();

  findByProviderId = (providerId: string, userId: number) =>
    this.createQueryBuilder('place')
      .where('place.providerId = :providerId', { providerId })
      .andWhere('place.userId = :userId', { userId })
      .getOne();
}

interface AverageScore {
  round: number | null;
  placeid: number;
}
