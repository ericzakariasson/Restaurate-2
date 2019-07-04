import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import {
  AddVisitInput,
  AddVisitResponse
} from '../../graphql/visit/AddVisitInput';
import { Tag } from '../place/tag.entity';
import { Visit } from './visit.entity';
import { User } from '../user/user.entity';
import { Place } from '../place/place.entity';
import { Order } from './order.entity';
import { Rate } from './rate.entity';
import { Context } from '../../graphql/types';

@Resolver(Visit)
export class AddVisitResolver {
  @Authorized()
  @Mutation(() => AddVisitResponse)
  async addVisit(
    @Arg('data') input: AddVisitInput,
    @Ctx() ctx: Context
  ): Promise<AddVisitResponse> {
    try {
      const user = await User.findOne({
        where: { id: ctx.req.session!.userId }
      });

      let place = await Place.findOne({
        where: {
          googlePlaceId: input.providerPlaceId
        }
      });

      if (!place) {
        place = await Place.create();
      }

      const tags = input.tags
        ? input.tags.map(name => Tag.create({ name, user }))
        : [];

      place.tags = place.tags ? place.tags.concat(tags) : tags;

      await place.save();

      const orders = input.orders
        ? input.orders.map(title => Order.create({ title, user }))
        : [];

      const ratings = Object.values(input.rate).filter(Boolean);
      const ratingSum = ratings.reduce((total, score) => total + score, 0);

      const rate = Rate.create({
        ...input.rate,
        score: Math.round((ratingSum / ratings.length) * 10) / 10
      });

      const visit = await Visit.create({
        ...input,
        orders,
        rate,
        user,
        place
      }).save();

      return { saved: true, place, visit };
    } catch (e) {
      console.error(e);
      return { saved: false };
    }
  }
}
