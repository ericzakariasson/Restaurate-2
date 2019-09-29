import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useConfirmUserMutation, MeDocument } from 'graphql/types';
import { Loading } from 'components';
import { routes } from 'routes';
import { GeneralError } from 'scenes/Error/GeneralError';

export const ConfirmUserScene = () => {
  const { token } = useParams();

  const [confirmUser, { data, loading, called }] = useConfirmUserMutation({
    variables: { token },
    refetchQueries: [{ query: MeDocument }],
    awaitRefetchQueries: true
  });

  const success = data && data.confirmUser;

  React.useEffect(() => {
    confirmUser(token);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (success) {
    return <Redirect to={routes.dashboard} />;
  }

  if (called && !success) {
    console.log('Could not confirm user');
  }

  return null;
};
