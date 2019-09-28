import * as React from 'react';
import { Page, Loading, Button } from 'components';
import { useMeQuery, useLogoutMutation, MeDocument } from 'graphql/types';
import { trackEvent } from 'analytics/trackEvent';
import { useApolloClient } from '@apollo/react-hooks';

export const SettingsScene = () => {
  const { data, loading } = useMeQuery();

  const client = useApolloClient();

  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: MeDocument }],
    awaitRefetchQueries: true
  });

  const handleLogout = async () => {
    try {
      await logout();

      await client.cache.reset();

      trackEvent({
        category: 'User',
        action: 'Logout'
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const me = data && data.me;

  const { name } = me!;

  return (
    <Page title="Inställningar">
      <h1>{name}</h1>
      <Button
        margin={['top']}
        color="white"
        variant="secondary"
        text="Logga ut"
        onClick={handleLogout}
      />
    </Page>
  );
};
