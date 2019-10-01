import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { routes } from '../routes';
import { useMeQuery, UserRole } from '../graphql/types';
import { GeneralError } from '../scenes';
import { Loading } from './Loading';

interface AdminRouteProps extends RouteProps {}

export const AdminRoute = (props: AdminRouteProps) => {
  const { data, loading, error } = useMeQuery();

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  if (!data.me) {
    return <Redirect to={routes.dashboard} />;
  }

  if (!data.me.roles.includes(UserRole.Admin)) {
    return <Redirect to={routes.dashboard} />;
  }

  return <Route {...props} />;
};
