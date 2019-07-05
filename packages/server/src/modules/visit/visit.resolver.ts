import {
  Resolver,
  Arg,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Authorized,
  Ctx
} from 'type-graphql';
import { Visit } from './visit.entity';
import { Rate } from './rate.entity';
import { Place } from '../place/place.entity';
import { User } from '../user/user.entity';
import { Service } from 'typedi';
import { PlaceService } from '../place/place.service';
import { UserService } from '../user/user.service';
import { VisitService } from './visit.service';
import { AddVisitResponse, AddVisitInput } from './visit.types';
import { Context } from '../../graphql/types';

@Service()
@Resolver(Visit)
export class VisitResolver {
  constructor(
    private readonly placeService: PlaceService,
    private readonly userService: UserService,
    private readonly visitService: VisitService
  ) {}

  @Query(() => Visit, { nullable: true })
  async visit(@Arg('id') id: number): Promise<Visit | undefined> {
    return this.visitService.findById(id);
  }

  @Authorized()
  @Mutation(() => AddVisitResponse)
  async addVisit(
    @Arg('data') input: AddVisitInput,
    @Ctx() ctx: Context
  ): Promise<AddVisitResponse> {
    const user = await this.userService.findById(ctx.req.session!.userId);

    if (!user) {
      throw new Error('No user');
    }

    const place = await this.placeService.findByInputOrCreate(
      input.place,
      user
    );
    const visit = await this.visitService.createVisit(input.visit, place, user);

    // const ratings = Object.values(input.rate).filter(Boolean);
    // const ratingSum = ratings.reduce((total, score) => total + score, 0);

    // const rate = Rate.create({
    //   ...input.rate,
    //   score: Math.round((ratingSum / ratings.length) * 10) / 10
    // });

    return {
      saved: true
    };
  }

  @FieldResolver(() => Rate)
  async rate(@Root() visit: Visit): Promise<Rate> {
    const rate = await Rate.findOne(visit.rateId);

    if (!rate) {
      throw new Error('No rate found');
    }

    return rate;
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
