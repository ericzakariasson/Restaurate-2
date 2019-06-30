import { Resolver, Ctx, Query, FieldResolver, Root } from 'type-graphql';
import { User } from '../../entity/User/User';
import { Context } from '../../types/graphql-utils';
import { Place } from '../../entity/Place/Place';
import { createQueryBuilder } from 'typeorm';
import { Visit } from '../../entity/Visit/Visit';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { id: ctx.req.session!.userId }
      });

      if (!user) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
  }

  @FieldResolver(() => [Place])
  async places(@Root() user: User): Promise<Place[]> {
    const places = await createQueryBuilder(Place, 'place')
      .innerJoin('place.visits', 'visit')
      .where('visit.user = :userId', { userId: user.id })
      .getMany();

    return places;
  }

  @FieldResolver(() => [Visit])
  async visits(@Root() user: User): Promise<Visit[]> {
    const visits = await createQueryBuilder(Visit, 'visit')
      .where('visit.user = :userId', { userId: user.id })
      .getMany();

    return visits;
  }

  @FieldResolver(() => Number)
  async placeCount(@Root() user: User): Promise<number> {
    const placeCount = await createQueryBuilder(Place, 'place')
      .innerJoin('place.visits', 'visit')
      .where('visit.user = :userId', { userId: user.id })
      .getCount();

    return placeCount;
  }

  @FieldResolver(() => Number)
  async visitCount(@Root() user: User): Promise<number> {
    const visitCount = await Visit.count({
      where: { userId: user.id }
    });

    return visitCount;
  }
}
