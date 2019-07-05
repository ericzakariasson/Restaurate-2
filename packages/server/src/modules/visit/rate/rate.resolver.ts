import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';
import { Service } from 'typedi';

@Service()
@Resolver(Rate)
export class RateResolver {
  constructor(private readonly rateService: RateService) {}

  @FieldResolver(() => [Rate], { nullable: true })
  async children(@Root() rate: Rate): Promise<Rate[]> {
    return this.rateService.getRateChildren(rate.id);
  }
}
