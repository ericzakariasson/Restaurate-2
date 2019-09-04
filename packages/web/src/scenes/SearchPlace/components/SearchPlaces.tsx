import * as React from 'react';
import styled from 'styled-components';
import { PlaceSearchItem } from 'graphql/types';
import { PlaceItem } from './PlaceItem';

const Results = styled.ul`
  margin: 0 -10px;
  padding: 20px 0;
`;

interface SearchPlacesProps {
  places: PlaceSearchItem[];
}

export const SearchPlaces = ({ places }: SearchPlacesProps) => {
  return (
    <Results>
      {places.map(place => (
        <PlaceItem key={place.foursquareId} place={place} />
      ))}
    </Results>
  );
};
