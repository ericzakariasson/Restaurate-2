import { Loading } from 'components';
import { notify } from 'components/Notification';
import { MeDocument, useConfirmUserMutation } from 'graphql/types';
import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { routes } from 'routes';

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
  }, [confirmUser, token]);

  if (loading) {
    return <Loading />;
  }

  if (success) {
    notify({ title: 'Konto bekräftat', level: 'success' });
    return <Redirect to={routes.dashboard} />;
  }

  if (called && !success) {
    notify({ title: 'Något gick fel', level: 'error' });
  }

  return null;
};
