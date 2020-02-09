import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { PageOptions } from 'graphql/pagination';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  searchByName = (term: string, { page, limit }: PageOptions) =>
    this.createQueryBuilder('user')
      .select()
      .where('user.firstName ILIKE :term', { term: `%${term}%` })
      .orWhere('user.lastName ILIKE :term', { term: `%${term}%` })
      .skip(page * limit)
      .take(limit)
      .getMany();
}
