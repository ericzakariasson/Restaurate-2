import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<TextProps>`
  margin: ${p => (p.large ? '-30px 0 30px' : '0 0 30px')};
  padding-top: 15px;
`;

interface TextProps {
  large: boolean;
}

const Text = styled.h1<TextProps>`
  font-size: ${p => (p.large ? '2rem' : '1.5rem')};
  font-weight: 400;
  transition: ${p => p.theme.transition};
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  margin-top: 10px;
  text-align: center;
`;

interface PageTitleProps {
  text: string;
  large?: boolean;
  subTitle?: string;
}

export const PageTitle = ({
  text,
  large = false,
  subTitle
}: PageTitleProps) => (
  <Wrapper large={large}>
    <Text large={large}>{text}</Text>
    {subTitle && <SubTitle>{subTitle}</SubTitle>}
  </Wrapper>
);
