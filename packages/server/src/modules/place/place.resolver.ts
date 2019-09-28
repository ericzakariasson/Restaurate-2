import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql';
import { Service } from 'typedi';
import { Context } from '../../graphql/types';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Visit } from '../visit/visit.entity';
import { Place } from './place.entity';
import { transformToBasicDetails } from './place.helpers';
import { PlaceService } from './place.service';
import {
  PlaceDetails,
  PlaceDetailsBasic,
  PlaceSearchResult,
  PlaceType,
  PositionInput,
  PriceLevel,
  UpdatePlaceInput
} from './place.types';
import { WantToVisitService } from './wantToVisit/wantToVisit.service';

@Service()
@Resolver(Place)
export class PlaceResolver {
  constructor(
    private readonly placeService: PlaceService,
    private readonly userService: UserService,
    private readonly wtvService: WantToVisitService
  ) {}

  @Authorized()
  @Query(() => PlaceSearchResult)
  async searchPlace(
    @Ctx() ctx: Context,
    @Arg('query') query: string,
    @Arg('position', { nullable: true }) position?: PositionInput
  ): Promise<PlaceSearchResult> {
    const places = await this.placeService.searchPlaces(
      ctx.req.session.userId,
      query,
      position
    );

    return new PlaceSearchResult({ places });
  }

  @Authorized()
  @Query(() => PlaceDetails)
  async placeDetails(
    @Arg('providerId') providerId: string
  ): Promise<PlaceDetails> {
    return this.placeService.getPlaceDetails(providerId);
  }

  @Authorized()
  @Query(() => Place, { nullable: true })
  async place(
    @Arg('providerId') providerId: string,
    @Ctx() ctx: Context
  ): Promise<Place | null> {
    const placeDetails = await this.placeService.getPlaceDetails(providerId);

    if (!placeDetails) {
      return null;
    }

    const userPlace = await this.placeService.findByProviderId(
      providerId,
      ctx.req.session.userId
    );

    if (!userPlace) {
      const place = new Place();
      place.providerId = placeDetails.providerId;
      place.priceLevel = PriceLevel.NotSet;
      place.tags = [];
      return place;
    }

    return userPlace;
  }

  @Authorized()
  @Query(() => [PlaceDetailsBasic])
  async wantToVisitList(@Ctx() ctx: Context): Promise<PlaceDetailsBasic[]> {
    const placeDetailsList = await this.placeService.getWantToVisitList(
      ctx.req.session.userId
    );

    const transform = transformToBasicDetails([]);

    return placeDetailsList.map(transform);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async toggleWantToVisit(
    @Arg('providerPlaceId') providerPlaceId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return this.wtvService.toggle(providerPlaceId, ctx.req.session.userId);
  }

  @Authorized()
  @Mutation(() => Place)
  async updatePlace(
    @Arg('providerId') providerId: string,
    @Arg('data') input: UpdatePlaceInput,
    @Ctx() ctx: Context
  ): Promise<Place> {
    return this.placeService.update(providerId, input, ctx.req.session.userId);
  }

  @Authorized()
  @Query(() => [PlaceType])
  async allPlaceTypes(): Promise<PlaceType[]> {
    return Object.values(PlaceType);
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

  @FieldResolver(() => PlaceDetails)
  async details(@Root() place: Place): Promise<PlaceDetails> {
    return this.placeService.getPlaceDetails(place.providerId);
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
    const wantToVisit = await this.wtvService.findByProviderId(
      place.providerId,
      ctx.req.session.userId
    );

    return Boolean(wantToVisit);
  }
}
