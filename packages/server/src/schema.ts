import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/UserResolver';
import { LoginResolver } from './modules/user/LoginResolver';
import { LogoutResolver } from './modules/user/LogoutResolver';
import { RegisterResolver } from './modules/user/RegisterResolver';
import { VisitResolver } from './modules/visit/VisitResolver';
import { AddVisitResolver } from './modules/visit/AddVisitResolver';
import { PlaceResolver } from './modules/place/PlaceResolver';

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
