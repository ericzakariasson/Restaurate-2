import { AuthChecker } from 'type-graphql';
import { Context } from '../../graphql/types';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  if (context.req.session.userId) {
    return true;
  }

  return false;
};
