import { InputType, Field } from 'type-graphql';

export enum PlaceType {
  Restaurant = 'RESTAURANT',
  Cafe = 'CAFE'
}

export enum PriceLevel {
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  Exclusive = 4
}

@InputType()
export class PlaceInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  foursquareId: string;

  @Field(() => PriceLevel, { nullable: true })
  priceLevel?: PriceLevel;

  @Field(() => [PlaceType])
  types: PlaceType[];

  @Field(() => [String])
  tags: string[];
}
