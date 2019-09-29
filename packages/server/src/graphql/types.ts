import { Request } from 'express';

interface Session extends Express.Session {
  userId?: number;
}

export interface SessionRequest extends Request {
  session: Express.Session & Session;
}

export interface Context {
  req: SessionRequest;
}
