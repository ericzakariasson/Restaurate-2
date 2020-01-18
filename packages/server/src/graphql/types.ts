import { Request } from 'express';

import { Field, ObjectType } from 'type-graphql';
import { ContainerInstance } from 'typedi';

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
  container: ContainerInstance;
  requestId: string;
}
