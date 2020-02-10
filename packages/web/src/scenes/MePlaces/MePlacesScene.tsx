import { useInfiniteScroll } from 'hooks';
import * as React from 'react';
import styled from 'styled-components';
import { Loading, Page } from '../../components';
import { NoResult } from '../../components/NoResult';
import { SkeletonCards } from '../../components/Skeleton';
import { useMePlacesQuery, useMeQuery, Place } from 'graphql/types';
import { myPlaceRoute } from '../../routes';
import { GeneralError } from '../Error/GeneralError';
import { PlaceCard } from 'components/PlaceCard';
import { updateQuery } from './updateQuery';

const PlaceList = styled.ul`
  list-style: none;
`;

const Loader = styled.div`
  width: 100%;
`;

export const MePlacesScene = () => {
  const { data: meData } = useMeQuery();
  const { data, loading, error, fetchMore } = useMePlacesQuery({
    variables: { page: 0 },
    notifyOnNetworkStatusChange: true
  });

  const loadMore = React.useCallback(
    (nextPage: number) =>
      fetchMore({
        variables: { page: nextPage },
        updateQuery
      }),
    [fetchMore]
  );

  const { ref, hasFetchedMore } = useInfiniteScroll({
    isFetching: loading,
    pageInfo: data?.places.pageInfo,
    loadMore
  });

  if (error) {
    return <GeneralError />;
  }

  if (loading && !hasFetchedMore) {
    return (
      <Page title="Besök" subTitle="- besök">
        <SkeletonCards count={7} />
      </Page>
    );
  }

  const placeCount = meData?.me?.placeCount;

  return (
    <Page title="Ställen" subTitle={formatPlaceCount(placeCount)}>
      {data?.places.data && data.places.data.length > 0 ? (
        <>
          <PlaceList>
            {data.places.data.map(place => (
              <PlaceCard
                key={place.providerId}
                place={place as Place}
                to={myPlaceRoute({ providerId: place.providerId })}
              />
            ))}
          </PlaceList>
          <Loader ref={ref}>{loading && <Loading fullscreen={false} />}</Loader>
        </>
      ) : (
        <NoResult label="ställen" />
      )}
    </Page>
  );
};

const formatPlaceCount = (placeCount?: number) =>
  placeCount ? `${placeCount} ställe${placeCount !== 1 ? 'n' : ''}` : undefined;
