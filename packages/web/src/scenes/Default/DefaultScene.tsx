import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useMe } from '../../hooks';
import { routes } from '../../routes';

export const DefaultScene = () => {
  const { isAuthenticated } = useMe();

  if (isAuthenticated) {
    return <Redirect to={routes.dashboard} />;
  }

  return (
    <div>
      <Link to={routes.login}>Logga in</Link>
    </div>
  );
};
