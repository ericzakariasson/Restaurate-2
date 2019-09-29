import {
  Resolver,
  Arg,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Authorized,
  Ctx,
  UseMiddleware
} from 'type-graphql';
import { Visit } from './visit.entity';
import { Place } from '../place/place.entity';
import { User } from '../user/user.entity';
import { Service } from 'typedi';
import { PlaceService } from '../place/place.service';
import { UserService } from '../user/user.service';
import { VisitService } from './visit.service';
import { VisitResponse, AddVisitInput, EditVisitInput } from './visit.types';
import { Context } from '../../graphql/types';
import { logger } from '../../utils/logger';
import { rateLimitAuthenticated } from '../../utils/rateLimit';

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

  @UseMiddleware(rateLimitAuthenticated(100))
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

  @UseMiddleware(rateLimitAuthenticated(500))
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

  @FieldResolver(() => Place)
  async place(@Root() visit: Visit): Promise<Place | undefined> {
    return this.placeService.findById(visit.placeId);
  }

  @FieldResolver(() => User)
  async user(@Root() visit: Visit): Promise<User | undefined> {
    return this.userService.findById(visit.userId);
  }
}
