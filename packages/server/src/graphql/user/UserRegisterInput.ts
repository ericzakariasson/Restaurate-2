import { InputType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class UserRegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Length(6, 64)
  @Field()
  password: string;
}
