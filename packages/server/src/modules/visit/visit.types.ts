import { InputType, Field, ObjectType } from 'type-graphql';
import { RateInput } from './rate/rate.types';

@InputType()
export class AddVisitInput {
  @Field()
  providerId: string;

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
}
