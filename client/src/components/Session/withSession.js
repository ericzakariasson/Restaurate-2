import React from 'react';

import { Query } from 'react-apollo';
import GET_VIEWER from './GET_VIEWER.gql';

const withSession = Component => props => (
  <Query query={GET_VIEWER}>
    {({ data, refetch, loading }) => (
      <Component {...props} loading={loading} session={data} refetch={refetch} />
    )}
  </Query>
);

export default withSession;