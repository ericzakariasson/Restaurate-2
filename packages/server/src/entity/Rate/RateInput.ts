import { InputType, Field } from 'type-graphql';
import { Rate } from './Rate';

@InputType('RateInput')
export class RateInput implements Partial<Rate> {
  @Field({ nullable: true })
  food: number;

  @Field({ nullable: true })
  service: number;

  @Field({ nullable: true })
  environment: number;

  @Field({ nullable: true })
  experience: number;
}
