import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import GET_VIEWER from './GET_VIEWER.gql';
import { routes } from '../../constants';

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_VIEWER}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null;
      }

      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
          <Redirect to={routes.HOME.path} />
        );
    }}
  </Query>
);

export default withAuthorization;