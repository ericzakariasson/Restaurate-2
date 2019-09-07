import styled from 'styled-components';

export const Textarea = styled.textarea`
  display: block;
  padding: 15px;
  border-radius: 6px;
  background: #fcfcfc;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  width: 100%;
  transition: ${p => p.theme.transition};
  -webkit-appearance: none;
  resize: vertical;
  box-shadow: ${p => p.theme.boxShadow};
  color: #222;
  line-height: 1.5;

  &:focus {
    border-color: #aaa;
    transition: ${p => p.theme.transition};
  }
`;
