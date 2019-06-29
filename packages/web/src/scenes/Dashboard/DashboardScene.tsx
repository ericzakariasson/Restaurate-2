import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMe } from '../../hooks';
import { Loading, NavButton } from '../../components';
import { routes } from '../../routes';

import { PlacesAndVisits } from './components/PlacesAndVisits';

const Page = styled.article`
  padding: 40px 20px;
`;

const Name = styled.h1`
  margin-bottom: 20px;
`;

export const DashboardScene = () => {
  const { me, loading } = useMe();

  if (loading) {
    return <Loading />;
  }

  if (me) {
    return (
      <Page>
        <Name>{me.firstName}</Name>
        <PlacesAndVisits
          placeCount={me.placeCount}
          visitCount={me.visitCount}
        />
        <NavButton to={routes.addVisit} text="Nytt besök" />
      </Page>
    );
  }

  return null;
};
