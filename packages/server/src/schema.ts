import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/UserResolver';
import { VisitResolver } from './modules/visit/VisitResolver';

export const schema = buildSchema({
  resolvers: [UserResolver, VisitResolver],
  validate: false
});
