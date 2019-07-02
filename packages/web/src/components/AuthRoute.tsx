import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { routes } from '../routes';
import { useMeQuery } from '../graphql/types';

interface AuthRouteProps extends RouteProps {
  fallbackRoute?: string;
}

export const AuthRoute = ({
  fallbackRoute = routes.login,
  ...props
}: AuthRouteProps) => {
  const { data, loading, error } = useMeQuery();

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (data && data.me) {
    return <Route {...props} />;
  }

  return <Redirect to={fallbackRoute} />;
};
