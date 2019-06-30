import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MePlaces } from '../../queries/types/MePlaces';
import { Loading, PlaceItem, PageTitle } from '../../components';

import { loader } from 'graphql.macro';
import { NoResult } from '../../components/NoResult';
const mePlacesQuery = loader('../../queries/mePlaces.gql');

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

const VisitList = styled.ul`
  list-style: none;
`;

export const MePlacesScene = () => {
  const { data, loading } = useQuery<MePlaces>(mePlacesQuery);

  if (loading) {
    return <Loading />;
  }

  if (data && data.me) {
    const { places, placeCount } = data.me;

    return (
      <Page>
        <PageTitle
          text="Ställen"
          subTitle={
            placeCount
              ? `${placeCount} ställe${placeCount > 1 ? 'n' : ''}`
              : undefined
          }
        />
        {placeCount === 0 ? (
          <NoResult label="ställen" />
        ) : (
          <VisitList>
            {places.map(place => (
              <PlaceItem key={place.id} {...place} />
            ))}
          </VisitList>
        )}
      </Page>
    );
  }

  return <span>No</span>;
};
