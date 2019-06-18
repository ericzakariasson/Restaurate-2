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

const registerMutation = loader('../../mutations/register.gql');

const Page = styled.section`
  padding: 60px 20px 40px;
`;

const Fields = styled.div`
  margin-bottom: 30px;
`;

const initialValues = {
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
  const register = useMutation<Register, RegisterVariables>(registerMutation);

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
                placeholder="Mackan"
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
                placeholder="mackan@mail.se"
                label="E-post"
              />
              <Field
                type="password"
                name="password"
                autoComplete="password"
                component={InputField}
                placeholder="M4CK4N"
                label="Lösenord (minst 6 tecken)"
              />
              <Field
                type="password"
                name="password2"
                autoComplete="password"
                component={InputField}
                placeholder="M4CK4N"
                label="Bekräfta lösenord"
              />
            </Fields>
            <Button disabled={!isValid} type="submit" text="Registrera" />
          </Form>
        )}
      </Formik>
    </Page>
  );
};
