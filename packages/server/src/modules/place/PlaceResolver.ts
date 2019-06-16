import { Resolver, Arg, Query } from 'type-graphql';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';

@Resolver(Place)
export class PlaceResolver {
  @Query(() => Place, { nullable: true })
  async place(
    @Arg('id') id: PrimaryGeneratedColumnType
  ): Promise<Place | null> {
    const place = await Place.findOne({ where: { id } });

    if (!place) {
      return null;
    }

    return place;
  }
}
