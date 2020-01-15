import * as React from 'react';
import styled from 'styled-components';
import { Page, Loading } from '../../components';
import { NoResult } from '../../components/NoResult';
import { SkeletonCards } from '../../components/Skeleton';
import { useMePlacesQuery, useMeQuery } from '../../graphql/types';
import { myPlaceRoute } from '../../routes';
import { GeneralError } from '../Error/GeneralError';
import { PlaceListItem } from './component/PlaceListItem';
import { Filter } from 'components/Filter/Filter';
import { updateQuery } from './updateQuery';
import { useInfiniteScroll } from 'hooks';

const PlaceList = styled.ul`
  list-style: none;
`;

export const MyPlacesScene = () => {
  const { data: meData } = useMeQuery();
  const { data, loading, error, fetchMore, variables } = useMePlacesQuery({
    variables: { page: 0, limit: 32 }
  });

  console.log(data?.places);

  const loadMore = async () => {
    if (
      data?.places.pageInfo.page !== null &&
      data?.places.pageInfo.page !== undefined &&
      data.places.pageInfo.hasNextPage
    ) {
      fetchMore({
        variables: {
          page: data.places.pageInfo.page + 1,
          limit: variables.limit
        },
        updateQuery
      });
    }
  };

  const { ref } = useInfiniteScroll({ loadMore });

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

  const placeCount = meData?.me?.placeCount;

  return (
    <Page title="Ställen" subTitle={formatPlaceCount(placeCount)}>
      {data?.places.data.length === 0 ? (
        <NoResult label="ställen" />
      ) : (
        <>
          {/* <Filter /> */}
          <PlaceList>
            {data?.places.data.map(place => (
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
          {data?.places.pageInfo.hasNextPage && (
            <Loading ref={ref} fullscreen={false} />
          )}
        </>
      )}
    </Page>
  );
};

const formatPlaceCount = (placeCount?: number) =>
  placeCount ? `${placeCount} ställe${placeCount > 1 ? 'n' : ''}` : undefined;
