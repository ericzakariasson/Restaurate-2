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
import { useInView } from 'react-intersection-observer';

const PlaceList = styled.ul`
  list-style: none;
`;

export const MyPlacesScene = () => {
  const { data, loading, error, fetchMore, variables } = useMePlacesQuery({
    variables: { page: 0, limit: 24 }
  });

  const [ref, inView] = useInView({ rootMargin: '240px' });
  console.log(data?.places.pageInfo);

  React.useEffect(() => {
    if (inView) {
      fetchMore({
        variables: {
          page: data?.places.pageInfo.page ?? variables.page + 1,
          limit: data?.places.pageInfo.limit ?? variables.limit + 1
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.places.data.length === 0) {
            return prev;
          }

          return {
            ...prev,
            places: {
              ...prev.places,
              ...fetchMoreResult.places,
              pageInfo: {
                ...fetchMoreResult.places.pageInfo,
                page: fetchMoreResult.places.pageInfo.page + 1
              },
              data: [...prev.places.data, ...fetchMoreResult.places.data]
            }
          };
        }
      });
    }
  }, [inView]);

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

  const places = data && data.places!;

  if (!places) {
    return null;
  }

  const placeCount = places.data.length;

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
            {places.data.map(place => (
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
          {data?.places.pageInfo.hasNextPage && <div ref={ref} />}
        </>
      )}
    </Page>
  );
};
