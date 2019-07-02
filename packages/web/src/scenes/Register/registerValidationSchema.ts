import { object, string, ref } from 'yup';

export const registerValidationSchema = object().shape({
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
