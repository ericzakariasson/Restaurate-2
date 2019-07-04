import { InputType, ID, ObjectType, Field } from 'type-graphql';
import { RateInput } from './RateInput';
import { Visit } from '../../modules/visit/visit.entity';
import { Place } from '../../modules/place/place.entity';
import { PlaceType1, PlaceType2 } from '@google/maps';

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

  @Field(() => [String])
  types: Array<PlaceType1 | PlaceType2>;

  @Field(() => [String], { nullable: true })
  tags?: string[];

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
