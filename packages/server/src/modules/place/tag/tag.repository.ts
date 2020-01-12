import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

export class TagRepository extends Repository<Tag> {
  findByPlaceId(placeId: number) {
    return this.createQueryBuilder('tag')
      .innerJoin('tag.place', 'place', 'place.id = :placeId', {
        placeId
      })
      .select('tag.*')
      .getRawMany();
  }

  findByPlaceIds(placeIds: number[]) {
    return this.createQueryBuilder('tag')
      .innerJoin('tag.place', 'place', 'place.id IN (:...placeIds)', {
        placeIds
      })
      .select('tag.*')
      .getRawMany();
  }

  findByUserId(userId: number) {
    return this.createQueryBuilder('tag')
      .innerJoin('tag.user', 'user', 'user.id = :userId', { userId })
      .select('tag.*')
      .getRawMany();
  }
}
