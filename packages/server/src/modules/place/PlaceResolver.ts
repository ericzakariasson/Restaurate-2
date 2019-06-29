import { Resolver, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';
import { Visit } from '../../entity/Visit';
import { Address } from '../../entity/Address';
import { Context } from '../../types/graphql-utils';

@Resolver(Place)
export class PlaceResolver {
  @Query(() => Place, { nullable: true })
  async place(
    @Arg('id') id: PrimaryGeneratedColumnType
  ): Promise<Place | null> {
    const place = await Place.findOne(id);

    if (!place) {
      return null;
    }

    return place;
  }

  @FieldResolver()
  async visits(@Root() place: Place, @Ctx() ctx: Context): Promise<Visit[]> {
    const visits = await Visit.find({
      where: { placeId: place.id, userId: ctx.req.session!.userId }
    });

    return visits;
  }

  @FieldResolver(() => Number)
  async visitCount(@Root() place: Place, @Ctx() ctx: Context): Promise<number> {
    const visitCount = await Visit.count({
      where: { placeId: place.id, userId: ctx.req.session!.userId }
    });

    return visitCount;
  }

  @FieldResolver(() => Address, { nullable: true })
  async address(@Root() place: Place): Promise<Address | null> {
    const address = await Address.findOne(place.addressId);

    if (!address) {
      return null;
    }

    return address;
  }

  @FieldResolver(() => Number)
  async averageScore(
    @Root() place: Place,
    @Ctx() ctx: Context
  ): Promise<number> {
    const visits = await Visit.find({
      where: { placeId: place.id, userId: ctx.req.session!.userId }
    });

    if (!visits.length) {
      return 0;
    }

    const averageScore =
      visits.reduce((score, visit) => score + visit.rate.score, 0) /
      visits.length;

    const rounded = Math.round(averageScore * 10) / 10;

    return rounded;
  }
}
