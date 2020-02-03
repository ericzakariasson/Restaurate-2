import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
  Int
} from 'type-graphql';
import { Service } from 'typedi';
import { PageOptions } from '../../graphql/pagination';
import { Context } from '../../graphql/types';
import { RateLimitAuthenticated } from '../middleware/rateLimit';
import { User, UserService } from '../user';
import { Visit, VisitService } from '../visit';
import { PlaceService } from './';
import { PlaceFilterOptions } from './place.dto';
import { Place } from './place.entity';
import { transformToBasicDetails } from './place.helpers';
import {
  PaginatedPlaceResponse,
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
    private readonly wtvService: WantToVisitService,
    private readonly visitService: VisitService
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
  ): Promise<PlaceDetails | null> {
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

    if (!details) {
      return null;
    }

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

    return placeDetailsList
      .map(transform)
      .filter(Boolean) as PlaceDetailsBasic[];
  }

  @Authorized()
  @Query(() => [PlaceDetailsBasic])
  async placesWantToVisit(@Ctx() ctx: Context): Promise<PlaceDetailsBasic[]> {
    const placeDetailsList = await this.placeService.getWantToVisitList(
      ctx.req.session.userId!
    );

    const transform = transformToBasicDetails([]);

    return placeDetailsList
      .map(transform)
      .filter(Boolean) as PlaceDetailsBasic[];
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
    @Arg('placeId', () => Int) placeId: number,
    @Arg('data') input: UpdatePlaceInput,
    @Ctx() ctx: Context
  ): Promise<Place> {
    return this.placeService.update(placeId, input, ctx.req.session.userId!);
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
  @Query(() => PaginatedPlaceResponse)
  async places(
    @Arg('options') options: PageOptions,
    @Ctx() ctx: Context
  ): Promise<PaginatedPlaceResponse> {
    const data = await this.placeService.getPlacesByUserId(
      ctx.req.session.userId!,
      options
    );

    const pageInfo = {
      ...options,
      hasNextPage: data.length >= options.limit
    };

    return new PaginatedPlaceResponse(data, pageInfo);
  }

  @Authorized()
  @Query(() => [Tag])
  async searchTag(
    @Arg('term') term: string,
    @Arg('ignoreIds', () => [Int]) ignoreIds: number[]
  ): Promise<Tag[]> {
    if (!term) {
      return [];
    }
    return this.tagService.searchTag(term, ignoreIds);
  }

  @FieldResolver()
  visits(@Root() place: Place): Promise<Visit[]> {
    return this.visitService.getVisitsByPlaceId(place.id);
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
    return this.placeService.getVisitCountById(place.id);
  }

  @FieldResolver(() => Number, { nullable: true })
  async averageScore(@Root() place: Place): Promise<number | null> {
    return this.placeService.getAverageScoreById(place.id);
  }

  @FieldResolver(() => PlaceDetails, { nullable: true })
  async details(@Root() place: Place): Promise<PlaceDetails | null> {
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
