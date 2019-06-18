import * as React from 'react';
import { FieldProps } from 'formik';
import styled from 'styled-components';

import { SmallLabel } from './Label';

export const Input = styled.input`
  display: block;
  padding: 15px;
  border-radius: 5px;
  background: #fcfcfc;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1.125rem;
  width: 100%;
  transition: ${p => p.theme.transition};
  height: 50px;
  box-shadow: ${p => p.theme.boxShadow};
  -webkit-appearance: none;
  color: #222;

  &:focus {
    border-color: #aaa;
    transition: ${p => p.theme.transition};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    display: none;
  }
`;

interface InputFieldProps extends FieldProps {
  label: string;
}

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

export const InputField = ({
  field,
  form,
  label,
  ...props
}: InputFieldProps) => (
  <Wrapper>
    <SmallLabel
      error={
        Boolean(form.touched[field.name]) && Boolean(form.errors[field.name])
      }
      text={label}
      htmlFor={field.name}
    />
    <Input {...field} {...props} id={field.name} />
  </Wrapper>
);
