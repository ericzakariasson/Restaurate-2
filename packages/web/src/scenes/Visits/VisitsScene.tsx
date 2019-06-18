import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MeVisits } from '../../queries/types/MeVisits';
import { loader } from 'graphql.macro';
import { Loading, VisitItem, PageTitle } from '../../components';
import { Redirect } from 'react-router';
import { routes } from '../../routes';

const meVisitsQuery = loader('../../queries/meVisits.gql');

const Page = styled.article`
  padding: 20px;
`;

const NoResult = styled.h2``;

export const VisitsScene = () => {
  const { data, loading, error } = useQuery<MeVisits>(meVisitsQuery);

  console.log(data);
  console.log(loading);
  console.log(error);

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
        visits.map(visit => <VisitItem {...visit} />)
      )}
    </Page>
  );
};
