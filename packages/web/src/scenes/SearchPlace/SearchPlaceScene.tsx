import * as React from 'react';
import styled from 'styled-components';
import { SearchForm, SearchPlaceFormValues } from './components/SearchForm';
import { useSearchPlaceLazyQuery } from 'graphql/types';
import { SearchPlaces } from './components/SearchPlaces';
import { Page } from 'components';

const NoResults = styled.p`
  margin-top: 20px;
  font-weight: 700;
  color: #666;
`;

const getVariables = (
  query: string,
  location: string,
  position: Position | null
) => ({
  filter: {
    query,
    ...(location && {
      near: location
    }),
    ...(position && {
      position: {
        lat: position && position.coords.latitude,
        lng: position && position.coords.longitude
      }
    })
  }
});

export const SearchPlaceScene = () => {
  const [search, { called, loading, data }] = useSearchPlaceLazyQuery();

  const handleSubmit = ({
    query,
    location,
    position
  }: SearchPlaceFormValues) => {
    const isValid = !!(query && (location || position));

    if (!isValid) {
      return;
    }

    search({
      variables: getVariables(query, location, position)
    });
  };

  const places = (data && data.searchPlace && data.searchPlace.places) || [];
  const noResults = called && !loading && places.length === 0;

  return (
    <Page title="Sök ställe">
      <SearchForm onSubmit={handleSubmit} />
      {noResults ? (
        <NoResults>Hittade inga ställen. Testa att ange plats</NoResults>
      ) : (
        <SearchPlaces places={places} />
      )}
    </Page>
  );
};
