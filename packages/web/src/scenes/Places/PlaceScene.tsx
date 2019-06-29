import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { Place, PlaceVariables } from '../../queries/types/Place';

import { loader } from 'graphql.macro';
import { Loading } from '../../components';
const placeQuery = loader('../../queries/place.gql');

const Page = styled.section`
  padding: 20px;
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
`;

const Address = styled.p``;

type WithPlaceSlug = { slug: string };

export const PlaceScene = ({
  match: {
    params: { slug }
  }
}: RouteComponentProps<WithPlaceSlug>) => {
  const { data, loading } = useQuery<Place, PlaceVariables>(placeQuery, {
    variables: { slug }
  });

  if (loading) {
    return <Loading />;
  }

  if (data && data.place) {
    const { place } = data;

    return (
      <Page>
        <article>
          <Name>{place.name}</Name>
          <Address>{place.address.country}</Address>
        </article>
      </Page>
    );
  }

  return <span>Hitta ej</span>;
};
