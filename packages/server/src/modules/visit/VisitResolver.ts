import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Visit, AddVisitInput, AddVisitResponse } from '../../entity/Visit';
import { Order } from '../../entity/Order';
import { Context } from 'src/types/context';
import { Rating } from '../../entity/Rating';
import { User } from '../../entity/User';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Place } from '../../entity/Place';
import { Address } from '../../entity/Address';
import { Tag } from '../../entity/Tag';

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

    let place = await Place.findOne({
      where: {
        googlePlaceId: input.providerPlaceId
      }
    });

    if (!place) {
      const placeData = (await ctx.client
        .place({ placeid: input.providerPlaceId })
        .asPromise()).json.result;

      const address = Address.createFromPlaceData(placeData);

      place = await Place.create({
        address,
        name: placeData.name,
        lat: placeData.geometry.location.lat,
        lng: placeData.geometry.location.lng,
        url: placeData.website,
        priceLevel: input.priceLevel
      }).save();
    }

    const tags = input.tags
      ? input.tags.map(title => Tag.create({ title, author: user }))
      : [];

    place.tags.push(...tags);
    await place.save();

    const orders = input.orders
      ? input.orders.map(title => Order.create({ title, author: user }))
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
      user,
      place
    });

    await visit.save();

    return { saved: true };
  }
}
