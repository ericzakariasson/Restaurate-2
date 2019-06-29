import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MeVisits } from '../../queries/types/MeVisits';
import { Loading, VisitItem, PageTitle } from '../../components';

import { loader } from 'graphql.macro';
const meVisitsQuery = loader('../../queries/meVisits.gql');

const Page = styled.article`
  padding: 20px;
`;

const VisitList = styled.ul`
  list-style: none;
`;

const NoResult = styled.h2``;

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
        <NoResult>Inga besök</NoResult>
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
