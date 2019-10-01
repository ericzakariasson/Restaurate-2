import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/user.resolver';
import { VisitResolver } from './modules/visit/visit.resolver';
import { PlaceResolver } from './modules/place/place.resolver';
import { RateResolver } from './modules/visit/rate/rate.resolver';

import { authChecker } from './modules/middleware/authorization';
import { Container } from 'typedi';
import { MetricsResolver } from './modules/admin/metrics/metrics.resolver';

export const generateSchema = async () =>
  await buildSchema({
    resolvers: [
      UserResolver,
      VisitResolver,
      PlaceResolver,
      RateResolver,
      MetricsResolver
    ],
    authChecker,
    container: Container
  });
