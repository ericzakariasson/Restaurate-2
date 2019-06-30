import { InputType, ID, ObjectType, Field } from 'type-graphql';
import { RateInput } from '../Rate/RateInput';
import { PlaceType1, PlaceType2 } from '@google/maps';
import { Visit } from './Visit';
import { Place } from '../Place/Place';

@InputType({ description: 'New visit data' })
export class AddVisitInput {
  @Field({ nullable: true })
  comment?: string;

  @Field()
  visitDate: Date;

  @Field(() => [String], { nullable: true })
  orders?: string[];

  @Field(() => RateInput)
  rate: RateInput;

  @Field(() => Number, { nullable: true })
  priceLevel?: number;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [String])
  types: Array<PlaceType1 | PlaceType2>;

  @Field(() => ID)
  providerPlaceId: string;
}

@ObjectType()
export class AddVisitResponse {
  @Field(() => Boolean)
  saved: boolean;

  @Field(() => Visit, { nullable: true })
  visit?: Visit;

  @Field(() => Place, { nullable: true })
  place?: Place;
}
