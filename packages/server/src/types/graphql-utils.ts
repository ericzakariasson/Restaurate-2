import { IResolvers } from 'graphql-tools';

export interface ResolverMap extends IResolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface Context {
  req: Express.Request;
}
