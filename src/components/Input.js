import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: ${p => p.theme.inputShadow};
  font-size: 2rem;
`;

const Input = ({ onChange, value, label, placeholder }) => {
  return (
    <StyledInput placeholder={placeholder} onChange={onChange} value={value} />
  )
}