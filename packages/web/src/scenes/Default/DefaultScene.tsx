import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useMe } from '../../hooks';
import { routes } from '../../routes';

export const DefaultScene = () => {
  const { data, loading } = useMe();

  if (loading) {
    return null;
  }

  if (data && data.me) {
    return <Redirect to={routes.dashboard} />;
  }

  return (
    <div>
      <Link to={routes.login}>Logga in</Link>
    </div>
  );
};
