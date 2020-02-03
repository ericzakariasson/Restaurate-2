import * as React from 'react';
import { FieldProps } from 'formik';
import styled from 'styled-components';

import { Label } from './Label';
import { Size } from 'style/theme';

type Padding = { [key in Size | string]: string };

const padding: Padding = {
  xxsmall: '4px 8px',
  xsmall: '4px 8px',
  small: '10px 15px',
  normal: '10px 15px',
  large: '15px'
};

interface InputProps {
  fontSize?: Size;
}

export const Input = styled.input<InputProps>`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #222;
  background: #f5f5f5;
  border-radius: 0.5rem;
  border: 1px solid #f5f5f5;
  outline: none;
  font-weight: 500;
  transition: ${p => p.theme.transition};
  -webkit-appearance: none;

  &:focus {
    transition: ${p => p.theme.transition};
    background: #fcfcfc;
    border-color: #eee;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    display: none;
  }

  &::placeholder {
    color: #ddd;
  }
`;

interface InputFieldProps extends FieldProps {
  label?: string;
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
    {label && (
      <Label
        error={
          Boolean(form.touched[field.name]) && Boolean(form.errors[field.name])
        }
        text={label}
        htmlFor={field.name}
      />
    )}
    <Input {...field} {...props} id={field.name} />
  </Wrapper>
);
