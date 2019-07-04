import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';
// import { Context } from '../../graphql/types';
import { PlaceService } from './place.service';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { VenueDetails } from '../../graphql/place/data.object';
import { useContainer } from 'class-validator';
import { Container } from 'typedi';

useContainer(Container);
@Resolver(Place)
export class PlaceResolver {
  constructor(
    private readonly placeService: PlaceService,
    private readonly foursquareService: FoursquareService
  ) {}

  @Query(() => Place, { nullable: true })
  async place(
    @Arg('id', { nullable: true }) id?: number,
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

  @FieldResolver(() => VenueDetails)
  async data(@Root() place: Place): Promise<VenueDetails> {
    return this.foursquareService.venue.details({
      VENUE_ID: place.foursquareId
    });
  }
}
