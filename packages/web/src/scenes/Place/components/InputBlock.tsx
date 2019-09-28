import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'components';

const Block = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const BlockText = styled.h4`
  font-size: 1.375rem;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

interface InputBlockProps {
  label: string;
  children: React.ReactNode;
  noMargin?: boolean;
}

export const InputBlock = ({
  children,
  label,
  noMargin = true
}: InputBlockProps) => (
  <Block>
    <Label text={label} noMargin={noMargin} />
    <BlockText>{children}</BlockText>
  </Block>
);
