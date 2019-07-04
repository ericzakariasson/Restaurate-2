import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';
// import { Context } from '../../graphql/types';
import { PlaceService } from './place.service';

@Resolver(Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => Place, { nullable: true })
  async place(
    @Arg('id', { nullable: true }) id?: PrimaryGeneratedColumnType,
    @Arg('slug', { nullable: true }) slug?: string
  ): Promise<Place | null> {
    return this.placeService.findByIdOrSlug(id, slug);
  }

  @FieldResolver()
  async visits(
    @Root() place: Place,
    @Arg('limit', { nullable: true }) limit?: number
  ): Promise<Visit[]> {
    return this.placeService.getVisits(place.id, { limit });
  }

  @FieldResolver(() => Number)
  async visitCount(@Root() place: Place): Promise<number> {
    return this.placeService.getVisitCount(place.id);
  }

  @FieldResolver(() => Number)
  async averageScore(@Root() place: Place): Promise<number> {
    return this.placeService.getAverageScore(place.id);
  }
}
