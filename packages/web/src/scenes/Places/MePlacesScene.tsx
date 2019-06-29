import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MePlaces } from '../../queries/types/MePlaces';
import { Loading, PlaceItem, PageTitle } from '../../components';

import { loader } from 'graphql.macro';
const mePlacesQuery = loader('../../queries/mePlaces.gql');

const Page = styled.article`
  padding: 20px;
`;

const VisitList = styled.ul`
  list-style: none;
`;

const NoResult = styled.h2``;

export const MePlacesScene = () => {
  const { data, loading } = useQuery<MePlaces>(mePlacesQuery);

  if (loading || !data || !data.me) {
    return <Loading />;
  }

  const { places, placeCount } = data.me;

  return (
    <Page>
      <PageTitle text="Ställen" />
      {placeCount === 0 ? (
        <NoResult>Inga ställen</NoResult>
      ) : (
        <VisitList>
          {places.map(place => (
            <PlaceItem key={place.id} {...place} />
          ))}
        </VisitList>
      )}
    </Page>
  );
};
