import {
  Resolver,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
  Authorized,
  Mutation
} from 'type-graphql';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';
import { PlaceService } from './place.service';
import { PlaceData } from '../../graphql/placeData';
import { Service, Container } from 'typedi';
import { useContainer } from 'typeorm';
import {
  PlaceSearchResult,
  PlaceSearchInput,
  PlaceSearchItem
} from './place.types';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import {
  transformVenueToSearchItem,
  transformVenueDetailsToBasicDetails
} from './place.helpers';
import { Context } from '../../graphql/types';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { WantToVisitService } from './wantToVisit/wantToVisit.service';

useContainer(Container);
@Service()
@Resolver(Place)
export class PlaceResolver {
  constructor(
    private readonly placeService: PlaceService,
    private readonly userService: UserService,
    private readonly foursquareService: FoursquareService,
    private readonly wtvService: WantToVisitService
  ) {}

  @Authorized()
  @Query(() => Place, { nullable: true })
  async place(@Arg('providerId') providerId: string): Promise<Place | null> {
    const venue = await this.foursquareService.venue.details(providerId);

    if (!venue) {
      return null;
    }

    const userPlace = await this.placeService.findByProviderId(providerId);

    if (!userPlace) {
      const place = new Place();
      place.foursquareId = venue.id;
      return place;
    }

    return userPlace;
  }

  @Authorized()
  @Query(() => PlaceSearchItem, { nullable: true })
  async placeBasicDetails(
    @Arg('id') id: string
  ): Promise<PlaceSearchItem | null> {
    const venue = await this.foursquareService.venue.details(id);
    const place = await this.placeService.findByProviderId(id);

    if (!venue) {
      return null;
    }

    const details = transformVenueDetailsToBasicDetails(place, venue);
    return details;
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
        position && { ll: [position.lat, position.lng], radius: 50_000 })
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

  @Authorized()
  @Mutation(() => Boolean)
  async toggleWantToVisit(
    @Arg('providerId') providerId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return this.wtvService.toggle(providerId, ctx.req.session!.userId);
  }

  @FieldResolver()
  async visits(
    @Root() place: Place,
    @Arg('limit', { nullable: true }) limit?: number
  ): Promise<Visit[]> {
    return this.placeService.getVisits(place.id, { limit });
  }

  @FieldResolver()
  async user(@Root() place: Place): Promise<User | null> {
    if (!place.userId) {
      return null;
    }

    const user = await this.userService.findById(place.userId);

    if (!user) {
      throw new Error('No user found');
    }

    return user;
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

  @FieldResolver(() => Boolean)
  async hasVisited(@Root() place: Place): Promise<boolean> {
    return (await this.visitCount(place)) > 0;
  }

  @FieldResolver(() => Boolean)
  async wantToVisit(
    @Root() place: Place,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return !!this.wtvService.findByProviderId(
      place.foursquareId,
      ctx.req.session!.userId
    );
  }
}
