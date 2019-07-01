import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MePlaces } from '../../queries/types/MePlaces';
import { Loading, PageTitle, CardWithScore } from '../../components';

import { loader } from 'graphql.macro';
import { NoResult } from '../../components/NoResult';
import { placeRoute } from '../../routes';
import { GeneralError } from '../Error/GeneralError';

const mePlacesQuery = loader('../../queries/mePlaces.gql');

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

const PlaceList = styled.ul`
  list-style: none;
`;

const VisitCount = styled.h5`
  margin-bottom: -5px;
`;

export const PlacesScene = () => {
  const { data, loading, error } = useQuery<MePlaces>(mePlacesQuery);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const me = data && data.me;
  const { places, placeCount } = me!;

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
        <PlaceList>
          {places.map(place => (
            <CardWithScore
              key={place.id}
              name={place.name}
              address={place.address.formatted}
              to={placeRoute(place.slug)}
              score={place.averageScore}
            >
              <VisitCount>{place.visitCount} besök</VisitCount>
            </CardWithScore>
          ))}
        </PlaceList>
      )}
    </Page>
  );
};
