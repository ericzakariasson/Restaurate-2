import { InputType, Field, ObjectType, registerEnumType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
// import { MutationResponse } from '../../graphql/types';
import { User } from './user.entity';
import { MutationResponse } from '../../graphql/types';

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

export enum LoginResponseCode {
  Success,
  NotFound,
  NotConfirmed
}

@ObjectType()
export class LoginMutationResponse extends MutationResponse {
  @Field(() => LoginResponseCode)
  code: LoginResponseCode;

  @Field(() => User, { nullable: true })
  user: User | null;
}

registerEnumType(LoginResponseCode, {
  name: 'LoginResponseCode', // this one is mandatory
  description: 'Response code for login resolver' // this one is optional
});
