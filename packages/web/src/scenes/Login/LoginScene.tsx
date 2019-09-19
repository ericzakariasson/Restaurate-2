import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, InputField, Page } from '../../components';

import { routes } from '../../routes';
import { useLoginMutation, MeDocument, useMeQuery } from '../../graphql/types';
import { loginValidationSchema } from './loginValidationSchema';

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

const TryAgain = styled.span`
  margin-bottom: 10px;
  color: ${p => p.theme.colors.error.default};
  display: block;
`;

const initialValues = {
  email: '',
  password: ''
};

export const LoginScene = ({ history }: RouteComponentProps) => {
  const { data } = useMeQuery();

  const [login, { loading }] = useLoginMutation();
  const [error, setError] = React.useState(false);

  if (data && data.me) {
    return <Redirect to={routes.dashboard} />;
  }

  return (
    <Page title="Logga in" center>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async values => {
          const { data } = await login({
            variables: { ...values },
            refetchQueries: [{ query: MeDocument }],
            awaitRefetchQueries: true
          });

          if (data && data.login && data.login.id) {
            history.push(routes.dashboard);
          } else {
            setError(true);
          }
        }}
      >
        {({ isValid }) => (
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
            {error && <TryAgain>Testa igen</TryAgain>}
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
