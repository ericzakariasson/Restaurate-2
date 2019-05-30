import React from 'react';
import styled from 'styled-components';

interface TextProps {
  large: boolean;
}

const Text = styled.h1<TextProps>`
  font-size: ${p => (p.large ? '2rem' : '1.5rem')};
  margin: ${p => (p.large ? '-30px 0 30px' : '30px 0')};
  font-weight: 400;
  transition: ${p => p.theme.transition};
`;

interface PageTitleProps {
  text: string;
  large: boolean;
}

export const PageTitle = ({ text, large }: PageTitleProps) => (
  <Text large={large}>{text}</Text>
);
