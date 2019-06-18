import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { Visit } from '../../entity/Visit';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';
import { User } from '../../entity/User';
import { Rate } from '../../entity/Rate';

@Resolver(Visit)
export class VisitResolver {
  @Query(() => Visit, { nullable: true })
  async visit(
    @Arg('id') id: PrimaryGeneratedColumnType
  ): Promise<Visit | null> {
    const visit = await Visit.findOne(id);

    if (!visit) {
      return null;
    }

    return visit;
  }

  @FieldResolver(() => Rate)
  async rate(@Root() visit: Visit): Promise<Rate> {
    const rate = await Rate.findOne(visit.placeId);

    if (!rate) {
      throw new Error('No rate found');
    }

    return rate;
  }

  @FieldResolver(() => Place)
  async place(@Root() visit: Visit): Promise<Place> {
    const place = await Place.findOne(visit.placeId);

    if (!place) {
      throw new Error('No place found');
    }

    return place;
  }

  @FieldResolver(() => User)
  async user(@Root() visit: Visit): Promise<User> {
    const user = await User.findOne(visit.userId);

    if (!user) {
      throw new Error('No user found');
    }

    return user;
  }
}
