import { ResolverMap } from 'src/types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    me: () => ({ name: 'eric', email: 'eric@mail.com' })
  }
};
