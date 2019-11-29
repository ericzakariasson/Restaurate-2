import * as React from 'react';
import { Page, Button } from 'components';
import styled from 'styled-components';
import { useSendConfirmationEmailMutation, useMeQuery } from 'graphql/types';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { notify } from 'components/Notification';

const Text = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const ConfirmationSentScene = () => {
  const { data } = useMeQuery();

  const [
    sendConfirmationEmail,
    { loading: sending }
  ] = useSendConfirmationEmailMutation();

  if (data && data.me && data.me.confirmed) {
    return <Redirect to={routes.dashboard} />;
  }

  const resend = async () => {
    if (data && data.me && data.me.email) {
      await sendConfirmationEmail({ variables: { email: data.me.email } });
      notify({
        title: 'Bekräftelsemail skickat!',
        level: 'success'
      });
    }
  };

  return (
    <Page title="Bekräfta din e-post">
      <Text>
        Vi har nu skickat ett bekräftelsemail till din e-post som du behöver
        bekräfta för att fortsätta. NÄr du har gjort det kan du börja använda
        Restaurate
      </Text>
      <Text>Har du inte fått något mail?</Text>
      <Button
        variant="secondary"
        color="white"
        text="Skicka bekräftelsemail igen"
        onClick={resend}
        loading={sending}
      />
    </Page>
  );
};
