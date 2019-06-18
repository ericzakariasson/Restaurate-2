import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMe } from '../../hooks';
import { Loading } from '../../components';
import { routes } from '../../routes';

const Page = styled.article`
  padding: 20px;
`;

const Name = styled.h1``;

const CountWrapper = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ccc;
  text-decoration: none;
  box-shadow: ${p => p.theme.boxShadow};
`;

const Label = styled.h2`
  padding: 10px;
  font-size: 1.25rem;
  color: #222;
  font-weight: 500;
  border-radius: 0 3px 3px 0;
`;

const Count = styled.h2`
  background: #eee;
  color: #222;
  padding: 10px;
  border-right: 1px solid #ccc;
  border-radius: 3px 0 0 3px;
  width: 3rem;
  text-align: center;
`;

export const DashboardScene = () => {
  const { me, loading } = useMe();

  if (loading) {
    return <Loading />;
  }

  if (me) {
    return (
      <Page>
        <CountWrapper to={routes.places}>
          <Count>{me.placeCount}</Count>
          <Label>Ställen</Label>
        </CountWrapper>
        <CountWrapper to={routes.visits}>
          <Count>{me.visitCount}</Count>
          <Label>Besök</Label>
        </CountWrapper>
        <Link to={routes.addVisit}>Nytt besök</Link>
      </Page>
    );
  }

  return null;
};
