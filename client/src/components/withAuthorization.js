import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { routes } from '../constants';
import { GET_VIEWER } from './withSession';

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