import { InputType, Field } from 'type-graphql';

@InputType('RateInput')
export class RateInput {
  @Field({ nullable: true })
  food: number;

  @Field({ nullable: true })
  service: number;

  @Field({ nullable: true })
  environment: number;

  @Field({ nullable: true })
  experience: number;
}
