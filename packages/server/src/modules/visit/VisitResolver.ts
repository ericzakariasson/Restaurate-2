import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { Visit } from '../../entity/Visit';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';
import { User } from '../../entity/User';

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
