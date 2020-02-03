import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'components';

const Block = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }
`;

const BlockText = styled.div`
  font-size: 1.375rem;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

interface InputBlockProps {
  label: string;
  children: React.ReactNode;
}

export const InputBlock = ({ children, label }: InputBlockProps) => (
  <Block>
    <Label text={label} />
    <BlockText>{children}</BlockText>
  </Block>
);

export const EmptyValue = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: #ddd;
`;
