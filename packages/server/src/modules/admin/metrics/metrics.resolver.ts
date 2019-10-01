import { Authorized, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User, UserRole } from '../../user/user.entity';

@ObjectType()
class Metrics {
  @Field()
  registeredUsers: number;

  @Field()
  confirmedUsers: number;

  @Field({ description: 'Users with at least one visit' })
  activeUsers: number;
}

@Service()
@Resolver()
export class MetricsResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  @Authorized(UserRole.Admin)
  @Query(() => Metrics)
  async metrics() {
    const response = new Metrics();

    response.registeredUsers = await this.userRepository.count();

    response.confirmedUsers = await this.userRepository.count({
      where: { confirmed: true }
    });

    response.activeUsers = await this.userRepository
      .createQueryBuilder('user')
      .select('user.id')
      .innerJoin('user.visits', 'visit', 'visit.userId = user.id')
      .groupBy('user.id')
      .getCount();

    return response;
  }
}
