import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Visit, AddVisitInput } from '../../entity/Visit';
import { Order } from '../../entity/Order';
import { Context } from 'src/types/context';
import { Rating } from '../../entity/Rating';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';

@Resolver(Visit)
export class VisitResolver {
  @Query(() => Visit)
  async visit(
    @Arg('id') id: PrimaryGeneratedColumnType
  ): Promise<Visit | undefined> {
    const visit = await Visit.findOne({ where: { id } });
    return visit;
  }

  @Mutation(() => Visit)
  async addVisit(
    @Arg('data') input: AddVisitInput,
    @Ctx() _ctx: Context
  ): Promise<Visit> {
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
      rating
    });

    await visit.save();

    return visit;
  }
}
