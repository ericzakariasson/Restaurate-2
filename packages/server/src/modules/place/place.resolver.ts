import {
  Resolver,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
  Authorized
} from 'type-graphql';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';
import { PlaceService } from './place.service';
import { PlaceData } from '../../graphql/placeData';
import { Service, Container } from 'typedi';
import { useContainer } from 'typeorm';
import { PlaceSearchResult, PlaceSearchInput } from './place.types';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { transformVenueToSearchItem } from './place.helpers';
import { Context } from '../../graphql/types';

useContainer(Container);
@Service()
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
    if (!id && !slug) {
      throw new Error('At least one argument is required');
    }

    return this.placeService.findByIdOrSlug(id, slug);
  }

  @Authorized()
  @Query(() => PlaceSearchResult, { nullable: true })
  async searchPlace(
    @Arg('filter') { query, near, position }: PlaceSearchInput,
    @Ctx() ctx: Context
  ): Promise<PlaceSearchResult | null> {
    if (!near && !position) {
      throw new Error('One of `near` or `position` is required');
    }

    const venues = await this.foursquareService.venue.search({
      query,
      intent: 'browse',
      ...(near && { near }),
      ...(!near &&
        position && { ll: [position.lat, position.lng], radius: 50000 })
    });

    if (!venues || venues.length === 0) {
      return null;
    }

    const userPlaces = await this.placeService.getUserPlacesByProviderIds(
      ctx.req.session!.userId,
      venues.map(venue => venue.id)
    );

    const result = venues.map(transformVenueToSearchItem(userPlaces));
    const response = new PlaceSearchResult({ places: result });
    return response;
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
