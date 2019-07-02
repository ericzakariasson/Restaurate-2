import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { Loading, PageTitle, CardWithScore } from '../../components';

import { NoResult } from '../../components/NoResult';
import { placeRoute } from '../../routes';
import { GeneralError } from '../Error/GeneralError';
import { useMePlacesQuery } from '../../graphql/types';

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

const PlaceList = styled.ul`
  list-style: none;
`;

const VisitCount = styled.h5`
  margin-bottom: -5px;
`;

export const MyPlacesScene = () => {
  const { data, loading, error } = useMePlacesQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const me = data && data.me!;
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
