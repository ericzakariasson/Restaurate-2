import React from 'react';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

export const GET_VIEWER = gql`
  {
    viewer {
      id
      name
      email
      picture
    }
  }
`;

const withSession = Component => props => (
  <Query query={GET_VIEWER}>
    {({ data, refetch, loading }) => (
      <Component {...props} loading={loading} session={data} refetch={refetch} />
    )}
  </Query>
);

export default withSession;