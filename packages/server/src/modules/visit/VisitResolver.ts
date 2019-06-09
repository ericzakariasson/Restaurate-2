import { Resolver, Mutation, InputType, Arg, Ctx, Field } from 'type-graphql';
import { Visit } from '../../entity/Visit';
import { Order } from '../../entity/Order';
import { Context } from 'src/types/graphql-utils';
import { Rating } from '../../entity/Rating';

@InputType({ description: 'New visit data' })
class AddVisitInput {
  @Field({ nullable: true })
  comment?: string;

  @Field()
  visitDate: Date;

  @Field(() => [String])
  orders: string[];

  @Field(() => Rating)
  rating: Rating;
}

@Resolver(Visit)
export class VisitResolver {
  @Mutation(() => Visit)
  async addVisit(
    @Arg('data') input: AddVisitInput,
    @Ctx() _ctx: Context
  ): Promise<Visit> {
    const orders = input.orders.map(title => Order.create({ title }));
    const rating = Object.entries(input.rating).reduce(
      (acc: any, [name, rate]: any) => {
        acc[name] = rate.score;
        return acc;
      },
      {}
    );
    console.log(rating);

    // const rating = Object.entries(input.rating).reduce((rating, [name, rate]) => {
    // }, {});

    const visit = Visit.create({
      ...input,
      orders
    });

    await visit.save();

    return visit;
  }
}
