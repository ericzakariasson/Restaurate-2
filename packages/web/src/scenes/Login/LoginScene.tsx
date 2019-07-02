import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { PageTitle, Button, InputField } from '../../components';

import { routes } from '../../routes';
import { useLoginMutation, MeDocument } from '../../graphql/types';
import { loginValidationSchema } from './loginValidationSchema';

const Page = styled.section`
  padding: ${p => p.theme.page.padding};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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

export const LoginScene = ({ history }: RouteComponentProps) => {
  const login = useLoginMutation();

  return (
    <Page>
      <PageTitle title="Logga in" large />
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
            <Button disabled={!isValid} type="submit" text="Logga in" />
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
