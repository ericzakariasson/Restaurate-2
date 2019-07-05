import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/user.resolver';
import { VisitResolver } from './modules/visit/visit.resolver';
import { PlaceResolver } from './modules/place/place.resolver';

import { authChecker } from './modules/middleware/authorization';
import { Container } from 'typedi';

export const schema = buildSchema({
  resolvers: [UserResolver, VisitResolver, PlaceResolver],
  authChecker,
  container: Container
});
