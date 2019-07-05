import { InputType, Field } from 'type-graphql';

@InputType()
export class RateInput {
  @Field()
  name: string;

  @Field()
  score: number;

  @Field({ nullable: true })
  calculatedScore?: boolean;

  @Field(() => [RateInput], { nullable: true })
  children?: RateInput[];
}
