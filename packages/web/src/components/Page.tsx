import * as React from 'react';
import styled, { css } from 'styled-components';
import Helmet from 'react-helmet';

interface PageWrapperProps {
  center: boolean;
  paddingBottom?: boolean;
}

const PageWrapper = styled.section<PageWrapperProps>`
  max-width: ${p => p.theme.page.maxWidth};
  margin: 0 auto;
  padding: ${p => p.theme.page.padding};
  display: flex;
  flex-direction: column;
  ${p =>
    p.center &&
    css`
      min-height: calc(100vh - 58px);
      justify-content: center;
    `};

  ${p =>
    p.paddingBottom &&
    css`
      padding-bottom: 80px;
    `};
`;

const PageTitleWrapper = styled.div`
  margin-bottom: 20px;
`;

interface TitleProps {
  large: boolean;
}

const Title = styled.h1<TitleProps>`
  font-size: 2rem;
  font-weight: 600;
  transition: ${p => p.theme.transition};
  color: ${p => p.theme.colors.black.default};
`;

const SubTitle = styled.p`
  font-size: 1rem;
  margin-top: 3px;
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
  center?: boolean;
  paddingBottom?: boolean;
}

export const Page = ({
  title,
  children,
  subTitle,
  largeTitle = false,
  center = false,
  paddingBottom = false
}: PageProps) => (
  <PageWrapper center={center} paddingBottom={paddingBottom}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <PageTitle title={title} large={largeTitle} subTitle={subTitle} />
    {children}
  </PageWrapper>
);
