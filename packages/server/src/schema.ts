import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/user.resolver';
import { LoginResolver } from './modules/user/LoginResolver';
import { LogoutResolver } from './modules/user/LogoutResolver';
import { RegisterResolver } from './modules/user/RegisterResolver';
import { VisitResolver } from './modules/visit/visit.resolver';
import { AddVisitResolver } from './modules/visit/AddVisitResolver';
import { PlaceResolver } from './modules/place/place.resolver';

import { authChecker } from './modules/middleware/authorization';

export const schema = buildSchema({
  resolvers: [
    UserResolver,
    RegisterResolver,
    LoginResolver,
    LogoutResolver,
    VisitResolver,
    AddVisitResolver,
    PlaceResolver
  ],
  authChecker
});
