import { trackEvent } from 'analytics/trackEvent';
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
  useSendConfirmationEmailMutation
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

const initialValues = {
  email: '',
  password: ''
};

export const LoginScene = () => {
  const { data: meData } = useMeQuery();

  const notificationId = React.useRef<string>('');

  const [login, { data: loginData, loading }] = useLoginMutation();

  const [
    sendConfirmationEmail,
    { loading: sending }
  ] = useSendConfirmationEmailMutation();

  if (meData && meData.me) {
    return <Redirect to={routes.dashboard} />;
  }

  if (loginData && loginData.login && loginData.login.success) {
    trackEvent({
      category: 'User',
      action: 'Login'
    });
    return <Redirect to={routes.dashboard} />;
  }

  return (
    <Page title="Logga in">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async values => {
          const { data: response } = await login({ variables: { ...values } });

          if (
            response &&
            response.login.messages &&
            response.login.code !== LoginResponseCode.Success
          ) {
            const level =
              response.login.code === LoginResponseCode.NotConfirmed
                ? 'info'
                : 'warning';

            const id = notify({
              title: response.login.messages.join(', '),
              level
            });

            notificationId.current = id.toString();
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
            {loginData &&
              loginData.login &&
              loginData.login.code === LoginResponseCode.NotConfirmed && (
                <Button
                  variant="secondary"
                  color="white"
                  size="normal"
                  text={'Skicka bekräftelsemail'}
                  onClick={async () => {
                    if (values.email) {
                      toast.dismiss(notificationId.current);

                      try {
                        await sendConfirmationEmail({
                          variables: { email: values.email }
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
                  }}
                  margin={['top']}
                  loading={sending}
                />
              )}
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
