import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { Visit, VisitVariables } from '../../queries/types/Visit';

import { loader } from 'graphql.macro';
import { Loading } from '../../components';
const visitQuery = loader('../../queries/visit.gql');

const Page = styled.section`
  padding: 20px;
`;

const Place = styled.article``;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
`;

const Address = styled.p``;

type WithVisitId = { id: string };

export const VisitScene = ({
  match: {
    params: { id }
  }
}: RouteComponentProps<WithVisitId>) => {
  const { data, loading } = useQuery<Visit, VisitVariables>(visitQuery, {
    variables: { id }
  });

  if (loading) {
    return <Loading />;
  }

  if (data && data.visit) {
    const { visit } = data;

    return (
      <Page>
        <Place>
          <Name>{visit.place.name}</Name>
          <Address>{visit.place.address.formatted}</Address>
        </Place>
      </Page>
    );
  }

  return <span>Ej hitta</span>;
};
