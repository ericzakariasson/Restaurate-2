import { Request } from 'express';

import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MutationResponse {
  @Field()
  success: boolean;

  @Field(() => [String])
  messages: string[];
}

interface Session extends Express.Session {
  userId?: number;
}

export interface SessionRequest extends Request {
  session: Express.Session & Session;
}

export interface Context {
  req: SessionRequest;
}
