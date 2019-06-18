import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useMe } from '../hooks';
import { routes } from '../routes';

interface AuthRouteProps extends RouteProps {
  fallbackRoute?: string;
}

export const AuthRoute = ({
  fallbackRoute = routes.login,
  ...props
}: AuthRouteProps) => {
  const { isAuthenticated, loading } = useMe();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect to={fallbackRoute} />;
  }

  return <Route {...props} />;
};
