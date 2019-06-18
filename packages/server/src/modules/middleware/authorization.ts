import { AuthChecker } from 'type-graphql';
import { Context } from '../../types/graphql-utils';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  if (context.req.session!.userId) {
    return true;
  }

  return false;
};
