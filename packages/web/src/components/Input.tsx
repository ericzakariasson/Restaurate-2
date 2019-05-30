import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  padding: 15px;
  border-radius: 5px;
  background: #f5f5f5;
  border: 1px solid #eee;
  outline: none;
  font-size: 1.125rem;
  width: 100%;
  transition: ${p => p.theme.transition};
  height: 50px;
  -webkit-appearance: none;

  &:focus {
    background: #fcfcfc;
    transition: ${p => p.theme.transition};
  }
`;
