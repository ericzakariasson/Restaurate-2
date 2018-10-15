import React from 'react';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

const GET_VIEWER = gql`
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
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
);

export default withSession;