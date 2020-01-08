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
import { logger } from '../../utils/logger';
import { RateLimitAuthenticated } from '../middleware/rateLimit';
import { Place } from '../place/place.entity';
import { PlaceService } from '../place/place.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { AddVisitInput, EditVisitInput, VisitResponse } from './visit.types';

@Service()
@Resolver(Visit)
export class VisitResolver {
  constructor(
    private readonly placeService: PlaceService,
    private readonly userService: UserService,
    private readonly visitService: VisitService // private readonly rateService: RateService
  ) {}

  @Query(() => Visit, { nullable: true })
  async visit(@Arg('id') id: string): Promise<Visit | undefined> {
    return this.visitService.findById(id);
  }

  @UseMiddleware(RateLimitAuthenticated(100))
  @Authorized()
  @Mutation(() => VisitResponse)
  async addVisit(
    @Arg('data') input: AddVisitInput,
    @Ctx() ctx: Context
  ): Promise<VisitResponse> {
    const user = await this.userService.findById(ctx.req.session.userId!);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.placeService.findByIdOrCreate(
      input.providerPlaceId,
      user
    );

    const visit = await this.visitService.createVisit(input, place, user);
    logger.info('Visit created', { visit: visit.id });

    return {
      saved: true,
      visit
    };
  }

  @UseMiddleware(RateLimitAuthenticated(500))
  @Authorized()
  @Mutation(() => VisitResponse)
  async editVisit(
    @Arg('data') input: EditVisitInput,
    @Ctx() ctx: Context
  ): Promise<VisitResponse> {
    const user = await this.userService.findById(ctx.req.session.userId!);

    if (!user) {
      throw new Error('No user found');
    }

    const visit = await this.visitService.editVisit(input, user);

    if (!visit) {
      throw new Error('Error editing visit');
    }

    logger.info('Visit edited', visit.id);

    return {
      saved: true,
      visit
    };
  }

  @UseMiddleware(RateLimitAuthenticated(500))
  @Authorized()
  @Mutation(() => Boolean)
  async deleteVisit(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return this.visitService.deleteVisit(id, ctx.req.session.userId!);
  }

  @Authorized()
  @Query(() => [Visit])
  async visits(@Ctx() ctx: Context): Promise<Visit[]> {
    return this.visitService.getVisitsByUserId(ctx.req.session.userId!);
  }

  @FieldResolver(() => Place)
  async place(@Root() visit: Visit): Promise<Place | undefined> {
    return this.placeService.findById(visit.placeId);
  }

  @FieldResolver(() => User)
  async user(@Root() visit: Visit): Promise<User | undefined> {
    return this.userService.findById(visit.userId);
  }
}
