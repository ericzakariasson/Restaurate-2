import * as React from 'react';
import styled from 'styled-components';

export const Textarea = styled.textarea`
  display: block;
  padding: 15px;
  border-radius: 5px;
  background: #f5f5f5;
  border: 1px solid #eee;
  outline: none;
  font-size: 1rem;
  width: 100%;
  transition: ${p => p.theme.transition};
  -webkit-appearance: none;
  resize: vertical;

  &:focus {
    background: #fcfcfc;
    transition: ${p => p.theme.transition};
  }
`;
