import { Repository, EntityRepository } from 'typeorm';
import { Tag } from './tag.entity';
import * as DataLoder from 'dataloader';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private loader: DataLoder<number, Tag[]> = new DataLoder(async placeIds => {
    const tags = await this.findByPlaceIds(placeIds);

    const mapped = placeIds.map(placeId =>
      tags.filter(tag => tag.place_id === placeId)
    );

    return mapped;
  });

  findByPlaceId = (placeId: number) => this.loader.load(placeId);

  findByPlaceIds = (placeIds: readonly number[]) =>
    this.createQueryBuilder('tag')
      .innerJoin('tag.place', 'place', 'place.id IN (:...placeIds)', {
        placeIds
      })
      .select('tag.*')
      .addSelect('place.id')
      .getRawMany();

  findByUserId = (userId: number) =>
    this.createQueryBuilder('tag')
      .innerJoin('tag.user', 'user', 'user.id = :userId', { userId })
      .select('tag.*')
      .getRawMany();

  searchByName = (term: string, idsToIgnore: number[] = [], limit?: number) => {
    const query = this.createQueryBuilder('tag')
      .select()
      .where('name ILIKE :term', { term: `%${term}%` });

    if (idsToIgnore.length > 0) {
      query.andWhere('id NOT IN (:...ids)', { ids: idsToIgnore });
    }

    if (limit) {
      query.take(limit);
    }

    return query.getMany();
  };
}
