import * as React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components';
import { usePosition } from 'hooks';
import { MapPin, Compass } from 'react-feather';
import { SearchForm, SearchPlaceFormValues } from './components/SearchForm';
import { useSearchPlaceLazyQuery } from 'graphql/types';
import { SearchPlaces } from './components/SearchPlaces';

const Page = styled.section`
  padding: ${p => p.theme.page.padding};
`;

const Wrapper = styled.div`
  margin-top: 20vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 30px;
`;

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
    <Page>
      <Wrapper>
        <Title>Sök ställe</Title>
        <SearchForm onSubmit={handleSubmit} />
        {noResults ? (
          <NoResults>Hittade inga ställen. Testa att ange plats</NoResults>
        ) : (
          <SearchPlaces places={places} />
        )}
      </Wrapper>
    </Page>
  );
};
