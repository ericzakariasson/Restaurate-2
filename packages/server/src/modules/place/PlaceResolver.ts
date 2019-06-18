import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';
import { Visit } from '../../entity/Visit';

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
  async visits(@Root() place: Place): Promise<Visit[]> {
    const visits = await Visit.find({ where: { placeId: place.id } });

    return visits;
  }
}
