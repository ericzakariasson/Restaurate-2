import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { PageTitle, Button, InputField } from '../../components';
import { loader } from 'graphql.macro';

import { Login, LoginVariables } from '../../mutations/types/Login';
import { routes } from '../../routes';

const loginMutation = loader('../../mutations/login.gql');
const meQuery = loader('../../queries/me.gql');

const Page = styled.section`
  padding: 60px 20px 40px;
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

const validationSchema = object().shape({
  email: string()
    .email()
    .required('Du måste ange en email'),
  password: string()
    .min(6)
    .max(64)
    .required('Du måste ange ett lösenord')
});

export const LoginScene = ({ history }: RouteComponentProps) => {
  const login = useMutation<Login, LoginVariables>(loginMutation, {
    refetchQueries: [{ query: meQuery }]
  });

  return (
    <Page>
      <PageTitle text="Logga in" large />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          const { data } = await login({
            variables: {
              ...values
            }
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
