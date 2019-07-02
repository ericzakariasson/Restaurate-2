import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { routes } from '../../routes';
import { useMeQuery } from '../../graphql/types';
import { GeneralError } from '../Error/GeneralError';

export const DefaultScene = () => {
  const { data, loading, error } = useMeQuery();

  if (loading) {
    return null;
  }

  if (error) {
    return <GeneralError />;
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
