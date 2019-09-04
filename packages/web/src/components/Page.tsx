import * as React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.section`
  padding: ${p => p.theme.page.padding};
  display: flex;
  flex-direction: column;
`;

const PageTitleWrapper = styled.div`
  margin-bottom: 30px;
  padding-top: 15px;
`;

interface TitleProps {
  large: boolean;
}

const Title = styled.h1<TitleProps>`
  font-size: 2rem;
  font-weight: 700;
  transition: ${p => p.theme.transition};
`;

const SubTitle = styled.p`
  font-size: 1rem;
`;

interface PageTitleProps {
  title: string;
  large?: boolean;
  subTitle?: string;
}

export const PageTitle = ({
  title,
  large = false,
  subTitle
}: PageTitleProps) => (
  <PageTitleWrapper>
    <Title large={large}>{title}</Title>
    {subTitle && <SubTitle>{subTitle}</SubTitle>}
  </PageTitleWrapper>
);

interface PageProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  largeTitle?: boolean;
  subTitle?: string;
}

export const Page = ({
  title,
  children,
  largeTitle = false,
  subTitle
}: PageProps) => (
  <PageWrapper>
    <PageTitle title={title} large={largeTitle} subTitle={subTitle} />
    {children}
  </PageWrapper>
);
