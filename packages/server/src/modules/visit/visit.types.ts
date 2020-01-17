import { InputType, Field, ObjectType } from 'type-graphql';
import { RateInput } from './rate/rate.types';
import { Visit } from './visit.entity';
import PaginatedResponse from '../../graphql/pagination';

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

  @Field(() => [VisitImageInput])
  images: VisitImageInput[];

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
export class EditVisitInput implements Omit<AddVisitInput, 'providerPlaceId'> {
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

  @Field(() => [VisitImageInput])
  images: VisitImageInput[];
}

@InputType()
export class VisitImageInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  publicId: string;

  @Field()
  url: string;

  @Field(() => [String])
  orders: string[];
}

@ObjectType()
export class PaginatedVisitResponse extends PaginatedResponse(() => [Visit]) {}
