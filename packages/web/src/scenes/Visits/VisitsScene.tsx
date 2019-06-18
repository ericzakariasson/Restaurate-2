import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MeVisits } from '../../queries/types/MeVisits';
import { loader } from 'graphql.macro';
import { Loading, VisitItem } from '../../components';

const meVisitsQuery = loader('../../queries/meVisits.gql');

const Page = styled.article`
  padding: 20px;
`;

const NoResult = styled.h2``;

export const VisitsScene = () => {
  const { data, loading } = useQuery<MeVisits>(meVisitsQuery);

  if (loading || !data) {
    return <Loading />;
  }

  if (!data.me) {
    return null;
  }

  const { visits, visitCount } = data.me;

  if (visitCount === 0) {
    return <NoResult>Inga besök</NoResult>;
  }

  return (
    <Page>
      {visits.map(visit => (
        <VisitItem {...visit} />
      ))}
    </Page>
  );
};
