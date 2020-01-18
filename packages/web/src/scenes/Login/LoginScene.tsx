import { trackEvent, setUser } from 'analytics/trackEvent';
import { notify } from 'components/Notification';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, InputField, Page } from '../../components';
import {
  LoginResponseCode,
  useLoginMutation,
  useMeQuery,
  useSendConfirmationEmailMutation,
  MeDocument,
  MeQuery,
  LoginMutationResponse
} from '../../graphql/types';
import { routes } from '../../routes';
import { loginValidationSchema } from './loginValidationSchema';
import { toast } from 'react-toastify';

const Fields = styled.div`
  margin-bottom: 30px;
`;

const RegisterText = styled.p`
  text-align: center;
  color: #222;
  margin-top: 40px;
`;

const Register = styled(Link)`
  color: #222;
`;

const handleLoginCode = (
  data: LoginMutationResponse | undefined,
  code: LoginResponseCode | undefined,
  sendConfirmationEmail: () => Promise<void>,
  sending: boolean
): string | undefined => {
  if (!data) {
    return;
  }

  switch (code) {
    case LoginResponseCode.Success:
      trackEvent({
        category: 'User',
        action: 'Login'
      });
      setUser(data.user!.id);
      break;
    case LoginResponseCode.NotConfirmed:
      return notify({
        title: data.messages.join(', '),
        level: 'info',
        content: (
          <Button
            variant="secondary"
            color="white"
            onClick={sendConfirmationEmail}
            text="Skicka bekräftelsemail"
            loading={sending}
            size="normal"
          />
        )
      }).toString();
    case LoginResponseCode.NotFound:
      notify({
        title: data.messages.join(', '),
        level: 'warning'
      }).toString();
      break;
    default:
      break;
  }
};

const initialValues = {
  email: '',
  password: ''
};

export const LoginScene = () => {
  const { data: meData } = useMeQuery();

  const notificationId = React.useRef<string>('');

  const [login, { data: loginData, loading }] = useLoginMutation({
    update(cache, { data }) {
      if (!(data && data.login.success)) {
        return;
      }

      try {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: { ...data!.login.user! } }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  const sendConfirmation = async (email: string) => {
    if (email) {
      toast.dismiss(notificationId.current);
      try {
        await sendConfirmationEmail({
          variables: { email }
        });
        trackEvent({
          category: 'User',
          action: 'Resend Confirm Mail'
        });
        notify({
          title: 'Bekräftelsemail skickat',
          level: 'success'
        });
      } catch (e) {
        notify({
          title: 'Kunde inte skicka mail',
          level: 'error'
        });
      }
    }
  };

  const [
    sendConfirmationEmail,
    { loading: sending }
  ] = useSendConfirmationEmailMutation();

  if (meData && meData.me && meData.me.confirmed) {
    return <Redirect to={routes.dashboard} />;
  }

  if (loginData && loginData.login && loginData.login.success) {
    return <Redirect to={routes.dashboard} />;
  }

  return (
    <Page title="Logga in">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async values => {
          const { data: response } = await login({ variables: { ...values } });

          const id = handleLoginCode(
            response?.login,
            response?.login.code,
            () => sendConfirmation(values.email),
            sending
          );

          if (id) {
            notificationId.current = id;
          }
        }}
      >
        {({ isValid, values }) => (
          <Form>
            <Fields>
              <Field
                type="email"
                name="email"
                autoComplete="email"
                component={InputField}
                placeholder="email@exempel.se"
                label="E-post"
              />
              <Field
                type="password"
                name="password"
                autoComplete="password"
                component={InputField}
                placeholder="lösenord1"
                label="Lösenord"
              />
            </Fields>
            <Button
              variant="primary"
              size="large"
              disabled={!isValid}
              loading={loading}
              type="submit"
              text="Logga in"
            />
            <RegisterText>
              Inget konto?{' '}
              <Register to={routes.register}>Registrera dig</Register>
            </RegisterText>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
