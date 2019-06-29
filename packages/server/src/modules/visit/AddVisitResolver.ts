import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Visit, AddVisitInput, AddVisitResponse } from '../../entity/Visit';
import { Order } from '../../entity/Order';
import { Context } from '../../types/graphql-utils';
import { Rate } from '../../entity/Rate';
import { User } from '../../entity/User';
import { Place, priceLevelMap } from '../../entity/Place';
import { Address } from '../../entity/Address';
import { Tag } from '../../entity/Tag';

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
        const placeData = (await ctx.client
          .place({ placeid: input.providerPlaceId })
          .asPromise()).json.result;

        const address = Address.createFromPlaceData(placeData);

        place = await Place.create({
          googlePlaceId: placeData.place_id,
          address,
          name: placeData.name,
          lat: placeData.geometry.location.lat,
          lng: placeData.geometry.location.lng,
          url: placeData.website,
          priceLevel: input.priceLevel
            ? priceLevelMap[input.priceLevel]
            : priceLevelMap[placeData.price_level]
        });

        place.slugify();
      }

      const tags = input.tags
        ? input.tags.map(title => Tag.create({ title, author: user }))
        : [];

      place.tags = place.tags ? place.tags.concat(tags) : tags;

      await place.save();

      const orders = input.orders
        ? input.orders.map(title => Order.create({ title, author: user }))
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
