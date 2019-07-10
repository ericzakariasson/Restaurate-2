import * as React from 'react';
import styled from 'styled-components';
import { Loading, NavButton } from '../../components';
import { routes } from '../../routes';

import { PlacesAndVisits } from './components/PlacesAndVisits';
import { useMeQuery } from '../../graphql/types';
import { GeneralError } from '../Error/GeneralError';

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
  padding-top: 40px;
`;

const Name = styled.h1`
  margin-bottom: 20px;
`;

export const DashboardScene = () => {
  const { data, loading, error } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const me = data && data.me;

  const { firstName, placeCount, visitCount } = me!;

  return (
    <Page>
      <Name>{firstName}</Name>
      <PlacesAndVisits placeCount={placeCount} visitCount={visitCount} />
      <NavButton variant="primary" to={routes.addVisit} text="Nytt besök" />
    </Page>
  );
};
