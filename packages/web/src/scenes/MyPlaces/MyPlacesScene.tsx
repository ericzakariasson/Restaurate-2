import * as React from 'react';
import styled from 'styled-components';
import { Page } from '../../components';
import { NoResult } from '../../components/NoResult';
import { SkeletonCards } from '../../components/Skeleton';
import { useMePlacesQuery } from '../../graphql/types';
import { myPlaceRoute } from '../../routes';
import { GeneralError } from '../Error/GeneralError';
import { PlaceListItem } from './component/PlaceListItem';
import { Filter } from 'components/Filter/Filter';

const PlaceList = styled.ul`
  list-style: none;
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
        <>
          {/* <Filter /> */}
          <PlaceList>
            {places.map(place => (
              <PlaceListItem
                key={place.providerId}
                name={place.details.name}
                address={place.details.location.address.formatted}
                visitCount={place.visitCount}
                averageScore={place.averageScore}
                to={myPlaceRoute({ providerId: place.providerId })}
                tags={place.tags}
              />
            ))}
          </PlaceList>
        </>
      )}
    </Page>
  );
};
