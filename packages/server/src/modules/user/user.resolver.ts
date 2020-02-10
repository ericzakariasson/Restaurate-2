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
import { RateLimit } from '../middleware/rateLimit';
import { User } from './user.entity';
import { UserNotConfirmedError, UserService } from './user.service';
import {
  LoginMutationResponse,
  LoginResponseCode,
  PaginatedUserResponse,
  UserRegisterInput
} from './user.types';
import { Place, PlaceService } from '../place';
import { Visit, VisitService } from '../visit';

@Service()
@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly placeService: PlaceService,
    private readonly visitService: VisitService
  ) {}
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return this.userService.getMe(ctx.req.session.userId!);
  }

  @Authorized()
  @Query(() => PaginatedUserResponse)
  async searchUsers(
    @Arg('term') term: string,
    @Arg('options') options: PageOptions
  ): Promise<PaginatedUserResponse> {
    if (term.length < 3) {
      return new PaginatedUserResponse([], { ...options, hasNextPage: false });
    }

    const data = await this.userService.searchUsers(term, options);

    const pageInfo = {
      ...options,
      hasNextPage: data.length >= options.limit
    };

    return new PaginatedUserResponse(data, pageInfo);
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => Int) userId: number): Promise<User | null> {
    return this.userService.findById(userId);
  }

  @UseMiddleware(RateLimit(20))
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg('token') token: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return this.userService.confirmUser(token, ctx.req);
  }

  @UseMiddleware(RateLimit(20))
  @Mutation(() => LoginMutationResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<LoginMutationResponse> {
    const response = new LoginMutationResponse();
    response.messages = [];
    try {
      const user = await this.userService.login(email, password, ctx.req);

      response.code = LoginResponseCode.Success;
      response.user = user;
      response.success = true;
    } catch (e) {
      response.code = LoginResponseCode.NotFound;
      response.user = null;
      response.success = false;
      response.messages = ['Kunde inte hitta någon användare'];

      if (e instanceof UserNotConfirmedError) {
        response.code = LoginResponseCode.NotConfirmed;
        response.messages = ['Ditt konto behöver bekräftas'];
      }
    } finally {
      return response;
    }
  }

  @UseMiddleware(RateLimit(20))
  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return this.userService.logout(ctx.req);
  }

  @UseMiddleware(RateLimit(20))
  @Mutation(() => Boolean)
  async sendConfirmationEmail(@Arg('email') email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('No user found');
    }

    return this.userService.sendConfirmationEmail(user);
  }

  @UseMiddleware(RateLimit(10))
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg('data') data: UserRegisterInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    return this.userService.register(data, ctx.req);
  }

  @FieldResolver(() => Number)
  async placeCount(@Root() user: User): Promise<number> {
    return this.userService.getUserPlaceCount(user.id);
  }

  @FieldResolver(() => Number)
  async visitCount(@Root() user: User): Promise<number> {
    return this.userService.getUserVisitCount(user.id);
  }

  @FieldResolver(() => [Place])
  async places(
    @Root() user: User,
    @Arg('options') options: PageOptions
  ): Promise<Place[]> {
    return this.placeService.getPlacesByUserId(user.id, options);
  }

  @FieldResolver(() => [Visit])
  async visits(
    @Root() user: User,
    @Arg('options') options: PageOptions
  ): Promise<Visit[]> {
    return this.visitService.getVisitsByUserId(user.id, options);
  }
}
