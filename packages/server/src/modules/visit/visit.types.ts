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
}

@ObjectType()
export class AddVisitResponse {
  @Field()
  saved: boolean;

  @Field(() => Visit)
  visit: Visit;
}
