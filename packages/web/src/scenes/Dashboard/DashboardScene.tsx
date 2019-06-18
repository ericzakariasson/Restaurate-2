import * as React from 'react';
import styled from 'styled-components';
import { useMe } from '../../hooks';
import { Loading } from '../../components';

const Page = styled.article``;

const Name = styled.h1``;

const CountWrapper = styled.div``;

const Label = styled.h2``;
const Count = styled.h3``;

export const DashboardScene = () => {
  const { me, loading } = useMe();

  if (loading) {
    return <Loading />;
  }

  if (me) {
    return (
      <Page>
        <Name>{me.name}</Name>

        <CountWrapper>
          <Label>Ställen</Label>
          <Count>{me.placeCount}</Count>
        </CountWrapper>
        <CountWrapper>
          <Label>Besök</Label>
          <Count>{me.visitCount}</Count>
        </CountWrapper>
      </Page>
    );
  }

  return null;
};
