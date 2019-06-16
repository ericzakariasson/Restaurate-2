import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/UserResolver';
import { VisitResolver } from './modules/visit/VisitResolver';
import { PlaceResolver } from './modules/place/PlaceResolver';

export const schema = buildSchema({
  resolvers: [UserResolver, VisitResolver, PlaceResolver],
  validate: false
});
