import * as React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components';
import { usePosition } from 'hooks';
import { MapPin, Compass } from 'react-feather';
import { SearchForm, SearchPlaceFormValues } from './components/SearchForm';
import { useSearchPlaceLazyQuery } from 'graphql/types';

const Page = styled.section`
  padding: ${p => p.theme.page.padding};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 30px;
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

  console.log(data);

  return (
    <Page>
      <Title>Sök ställe</Title>
      <SearchForm onSubmit={handleSubmit} />
    </Page>
  );
};
