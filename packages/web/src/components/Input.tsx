import * as React from 'react';
import { FieldProps } from 'formik';
import styled from 'styled-components';

import { Label } from './Label';
import { Size } from 'style';

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
  padding: ${p => padding[p.fontSize || 'large']};
  border-radius: 6px;
  background: #fcfcfc;
  border: 1px solid #eee;
  outline: none;
  font-size: ${p => p.theme.fontSize[p.fontSize || 'large']};
  width: 100%;
  transition: ${p => p.theme.transition};
  box-shadow: ${p => p.theme.boxShadow};
  -webkit-appearance: none;
  color: #222;

  &:focus {
    border-color: #ccc;
    transition: ${p => p.theme.transition};
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
