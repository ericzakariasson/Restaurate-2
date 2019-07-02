import { object, string } from 'yup';

export const loginValidationSchema = object().shape({
  email: string()
    .email()
    .required('Du måste ange en email'),
  password: string()
    .min(6)
    .max(64)
    .required('Du måste ange ett lösenord')
});
