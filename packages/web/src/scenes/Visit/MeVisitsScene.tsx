import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MeVisits } from '../../queries/types/MeVisits';
import { Loading, VisitItem, PageTitle } from '../../components';

import { loader } from 'graphql.macro';
import { NoResult } from '../../components/NoResult';
const meVisitsQuery = loader('../../queries/meVisits.gql');

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

const VisitList = styled.ul`
  list-style: none;
`;

export const MeVisitsScene = () => {
  const { data, loading } = useQuery<MeVisits>(meVisitsQuery);

  if (loading || !data || !data.me) {
    return <Loading />;
  }

  const { visits, visitCount } = data.me;

  return (
    <Page>
      <PageTitle text="Besök" />
      {visitCount === 0 ? (
        <NoResult label="besök" />
      ) : (
        <VisitList>
          {visits.map(visit => (
            <VisitItem key={visit.id} {...visit} />
          ))}
        </VisitList>
      )}
    </Page>
  );
};
