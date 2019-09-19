import {
  Resolver,
  Ctx,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Arg
} from 'type-graphql';
import { User } from './user.entity';
import { Place } from '../place/place.entity';
import { Visit } from '../visit/visit.entity';
import { Context } from '../../graphql/types';
import { Service } from 'typedi';
import { UserService } from './user.service';
import { UserRegisterInput } from './user.types';

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return this.userService.getMe(ctx.req.session.userId);
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    return this.userService.login(email, password, ctx.req);
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return this.userService.logout(ctx.req);
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Arg('data') data: UserRegisterInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    return this.userService.register(data, ctx.req);
  }

  @FieldResolver(() => [Place])
  async places(@Root() user: User): Promise<Place[]> {
    return this.userService.getUserPlaces(user.id);
  }

  @FieldResolver(() => [Visit])
  async visits(@Root() user: User): Promise<Visit[]> {
    return this.userService.getUserVisits(user.id);
  }

  @FieldResolver(() => Number)
  async placeCount(@Root() user: User): Promise<number> {
    return this.userService.getUserPlaceCount(user.id);
  }

  @FieldResolver(() => Number)
  async visitCount(@Root() user: User): Promise<number> {
    return this.userService.getUserVisitCount(user.id);
  }
}
