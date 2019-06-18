import { Resolver, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';
import { Visit } from '../../entity/Visit';
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
}