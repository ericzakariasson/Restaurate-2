import { InputType, Field, ObjectType } from 'type-graphql';
import { RateInput } from './rate/rate.types';
import { Visit } from './visit.entity';

@InputType()
export class AddVisitInput {
  @Field()
  providerPlaceId: string;

  @Field()
  visitDate: Date;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => [String], { nullable: true })
  orders?: string[];

  @Field(() => [RateInput])
  ratings: RateInput[];

  @Field()
  isPrivate: boolean;

  @Field()
  isTakeAway: boolean;
}

@ObjectType()
export class VisitResponse {
  @Field()
  saved: boolean;

  @Field(() => Visit)
  visit: Visit;
}

@InputType()
export class EditVisitInput implements Partial<AddVisitInput> {
  @Field()
  visitId: string;

  @Field()
  visitDate: Date;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => [String])
  orders: string[];

  @Field(() => [RateInput])
  ratings: RateInput[];

  @Field()
  isPrivate: boolean;

  @Field()
  isTakeAway: boolean;
}
