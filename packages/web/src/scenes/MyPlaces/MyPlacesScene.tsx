import * as React from 'react';
import styled from 'styled-components';
import { CardWithScore, Page } from '../../components';

import { NoResult } from '../../components/NoResult';
import { placeRoute } from '../../routes';
import { GeneralError } from '../Error/GeneralError';
import { useMePlacesQuery } from '../../graphql/types';
import { SkeletonCards } from '../../components/Skeleton';

const PlaceList = styled.ul`
  list-style: none;
`;

const VisitCount = styled.h5`
  margin-bottom: -5px;
`;

export const MyPlacesScene = () => {
  const { data, loading, error } = useMePlacesQuery();

  if (error) {
    return <GeneralError />;
  }

  if (loading) {
    return (
      <Page title="Besök" subTitle="- besök">
        <SkeletonCards count={5} />
      </Page>
    );
  }

  const me = data && data.me!;
  const { places, placeCount } = me!;

  return (
    <Page
      title="Ställen"
      subTitle={
        placeCount
          ? `${placeCount} ställe${placeCount > 1 ? 'n' : ''}`
          : undefined
      }
    >
      {placeCount === 0 ? (
        <NoResult label="ställen" />
      ) : (
        <PlaceList>
          {places.map(place => (
            <CardWithScore
              key={place.foursquareId}
              name={place.data.name}
              address={place.data.location.address || '–'}
              to={placeRoute(place.foursquareId)}
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
