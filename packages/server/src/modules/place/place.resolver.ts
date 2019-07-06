import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';
import { PlaceService } from './place.service';
import { PlaceData } from '../../graphql/placeData';
import { Service, Container } from 'typedi';
import { useContainer } from 'typeorm';

useContainer(Container);
@Service()
@Resolver(Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => Place, { nullable: true })
  async place(
    @Arg('id', { nullable: true }) id?: number,
    @Arg('slug', { nullable: true }) slug?: string
  ): Promise<Place | null> {
    if (!id && !slug) {
      throw new Error('At least one argument is required');
    }

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

  @FieldResolver(() => PlaceData)
  async data(@Root() place: Place): Promise<PlaceData> {
    return this.placeService.getPlaceData(place.foursquareId);
  }
}
