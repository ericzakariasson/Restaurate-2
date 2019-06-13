import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Visit, AddVisitInput, AddVisitResponse } from '../../entity/Visit';
import { Order } from '../../entity/Order';
import { Context } from 'src/types/context';
import { Rating } from '../../entity/Rating';
import { User } from '../../entity/User';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';

@Resolver(Visit)
export class VisitResolver {
  @Query(() => Visit, { nullable: true })
  async visit(
    @Arg('id') id: PrimaryGeneratedColumnType
  ): Promise<Visit | null> {
    const visit = await Visit.findOne({ where: { id } });

    if (!visit) {
      return null;
    }

    return visit;
  }

  @Mutation(() => AddVisitResponse)
  async addVisit(
    @Arg('data') input: AddVisitInput,
    @Ctx() ctx: Context
  ): Promise<AddVisitResponse> {
    const user = await User.findOne({ where: { id: ctx.req.session!.userId } });

    console.log(input);

    const place = (await ctx.client
      .place({ placeid: input.providerPlaceId })
      .asPromise()).json.result;

    const orders = input.orders
      ? input.orders.map(title => Order.create({ title }))
      : [];

    const ratings = Object.values(input.rating).filter(Boolean);
    const ratingSum = ratings.reduce((total, score) => total + score, 0);

    const rating = Rating.create({
      ...input.rating,
      score: ratingSum / ratings.length,
      rawData: JSON.stringify(input.rating)
    });

    const visit = Visit.create({
      ...input,
      orders,
      rating,
      user
    });

    await visit.save();

    return { saved: true };
  }
}
