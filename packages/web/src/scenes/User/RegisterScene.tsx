import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { string, object, ref } from 'yup';
import { useMutation } from 'react-apollo-hooks';
import { PageTitle, Button, InputField } from '../../components';
import { loader } from 'graphql.macro';

import { Register, RegisterVariables } from '../../mutations/types/Register';
import { RouteComponentProps } from 'react-router';
import { routes } from '../../routes';
import { Link } from 'react-router-dom';

const registerMutation = loader('../../mutations/register.gql');
const meQuery = loader('../../queries/me.gql');

const Page = styled.section`
  padding: ${p => p.theme.page.padding};
`;

const Fields = styled.div`
  margin-bottom: 30px;
`;

const LoginText = styled.p`
  text-align: center;
  color: #222;
  margin-top: 40px;
`;

const Login = styled(Link)`
  color: #222;
`;

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: ''
};

const validationSchema = object().shape({
  firstName: string().required('Du måste ange ett förnamn'),
  lastName: string(),
  email: string()
    .email()
    .required('Du måste ange en email'),
  password: string()
    .min(6)
    .max(64)
    .required('Du måste ange ett lösenord'),
  password2: string()
    .oneOf([ref('password'), null], 'Lösenord måste vara samma')
    .required('Lösenord måste vara samma')
});

export const RegisterScene = ({ history }: RouteComponentProps) => {
  const register = useMutation<Register, RegisterVariables>(registerMutation, {
    refetchQueries: [{ query: meQuery }]
  });

  return (
    <Page>
      <PageTitle text="Registrera" large />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          const { password2, ...inputData } = values;

          const { data } = await register({
            variables: {
              data: inputData
            }
          });

          if (data && data.register) {
            history.push(routes.dashboard);
          }
        }}
      >
        {({ isValid }) => (
          <Form>
            <Fields>
              <Field
                type="text"
                name="firstName"
                component={InputField}
                placeholder="Anders"
                label="Förnamn"
              />
              <Field
                type="text"
                name="lastName"
                component={InputField}
                placeholder="Svensson"
                label="Efternamn"
              />
              <Field
                type="email"
                name="email"
                autoComplete="email"
                component={InputField}
                placeholder="anders.s@exempel.se"
                label="E-post"
              />
              <Field
                type="password"
                name="password"
                autoComplete="password"
                component={InputField}
                placeholder="lösenord1"
                label="Lösenord (minst 6 tecken)"
              />
              <Field
                type="password"
                name="password2"
                autoComplete="password"
                component={InputField}
                placeholder="lösenord1"
                label="Bekräfta lösenord"
              />
            </Fields>
            <Button disabled={!isValid} type="submit" text="Registrera" />
            <LoginText>
              Har du redan ett konto?{' '}
              <Login to={routes.login}>Logga in här</Login>
            </LoginText>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
