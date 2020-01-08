import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';
import { Service } from 'typedi';
import { Context } from '../../graphql/types';
import { RateLimitAuthenticated } from '../middleware/rateLimit';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Visit } from '../visit/visit.entity';
import { PlaceFilterOptions } from './place.dto';
import { Place } from './place.entity';
import { transformToBasicDetails } from './place.helpers';
import { PlaceService } from './place.service';
import {
  PlaceDetails,
  PlaceDetailsBasic,
  PlaceSearchResult,
  PlaceType,
  PositionInput,
  UpdatePlaceInput
} from './place.types';
import { PlacePreview } from './preview/place.preview.types';
import { Tag } from './tag/tag.entity';
import { TagService } from './tag/tag.service';
import { WantToVisitService } from './wantToVisit/wantToVisit.service';

@Service()
@Resolver(Place)
export class PlaceResolver {
  constructor(
    private readonly placeService: PlaceService,
    private readonly tagService: TagService,
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
      ctx.req.session.userId!,
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
    @Ctx() ctx: Context,
    @Arg('providerId') providerId: string,
    @Arg('userId', { nullable: true }) userId?: string
  ): Promise<Place | null> {
    const parsedUserId = Number(userId);

    if (userId && isNaN(parsedUserId)) {
      throw new Error('is NaN');
    }

    const place = await this.placeService.findByProviderId(
      providerId,
      userId ? parsedUserId : ctx.req.session.userId!
    );

    if (!place) {
      return null;
    }

    if (place.userId !== ctx.req.session.userId) {
      return null;
    }

    return place;
  }

  @Authorized()
  @Query(() => PlacePreview, { nullable: true })
  async previewPlace(
    @Arg('providerId', { nullable: true }) providerId: string,
    @Ctx() ctx: Context
  ): Promise<PlacePreview | null> {
    const { userId } = ctx.req.session;
    const details = await this.placeService.getPlaceDetails(providerId);

    const place = await this.placeService.findByProviderId(
      details.providerId,
      userId!
    );

    const preview = new PlacePreview();
    preview.placeId = place ? place.id : null;

    return preview;
  }

  @UseMiddleware(RateLimitAuthenticated(100))
  @Authorized()
  @Mutation(() => Place, { nullable: true })
  async createPlace(
    @Arg('providerId') providerId: string,
    @Ctx() ctx: Context
  ): Promise<Place | null> {
    const { userId } = ctx.req.session;
    const user = await this.userService.findById(userId!);

    if (!user) {
      throw new Error(`No user found with id "${userId}"`);
    }

    const place = await this.placeService.createPlace(providerId, user);

    return place;
  }

  @Authorized()
  @Query(() => [PlaceDetailsBasic])
  async wantToVisitList(@Ctx() ctx: Context): Promise<PlaceDetailsBasic[]> {
    const placeDetailsList = await this.placeService.getWantToVisitList(
      ctx.req.session.userId!
    );

    const transform = transformToBasicDetails([]);

    return placeDetailsList.map(transform);
  }

  @Authorized()
  @Query(() => [PlaceDetailsBasic])
  async placesWantToVisit(@Ctx() ctx: Context): Promise<PlaceDetailsBasic[]> {
    const placeDetailsList = await this.placeService.getWantToVisitList(
      ctx.req.session.userId!
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
    return this.wtvService.toggle(providerPlaceId, ctx.req.session.userId!);
  }

  @Authorized()
  @Query(() => Boolean)
  async wantToVisitPlace(
    @Arg('providerId') providerId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const wtv = await this.wtvService.findByProviderId(
      providerId,
      ctx.req.session.userId!
    );

    return Boolean(wtv);
  }

  @UseMiddleware(RateLimitAuthenticated(500))
  @Authorized()
  @Mutation(() => Place)
  async updatePlace(
    @Arg('providerId') providerId: string,
    @Arg('data') input: UpdatePlaceInput,
    @Ctx() ctx: Context
  ): Promise<Place> {
    return this.placeService.update(providerId, input, ctx.req.session.userId!);
  }

  @Authorized()
  @Query(() => [PlaceType])
  async allPlaceTypes(): Promise<PlaceType[]> {
    return Object.values(PlaceType);
  }

  @Authorized()
  @Query(() => PlaceFilterOptions)
  async placeFilterOptions(@Ctx() ctx: Context): Promise<PlaceFilterOptions> {
    return this.placeService.placeFilterOptions(ctx.req.session.userId!);
  }

  @Authorized()
  @Query(() => [Place])
  async places(@Ctx() ctx: Context): Promise<Place[]> {
    return this.placeService.getPlacesByUserId(ctx.req.session.userId!);
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
      ctx.req.session.userId!
    );

    return Boolean(wantToVisit);
  }

  @FieldResolver(() => [Tag])
  async tags(@Root() place: Place): Promise<Tag[]> {
    return this.tagService.getTagsByPlaceId(place.id);
  }
}
