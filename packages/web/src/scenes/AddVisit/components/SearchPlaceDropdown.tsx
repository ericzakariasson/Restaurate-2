import * as React from 'react';
import styled from 'styled-components';
import { PlaceSearchItem } from 'graphql/types';
import { SearchPlaceResult } from './SearchPlaceResult';

const Results = styled.ul`
  margin: 0 -10px;
  padding: 20px 0;
`;

interface SearchPlaceDropdownProps {
  places: PlaceSearchItem[];
  loading: boolean;
  setSelected: (place: PlaceSearchItem) => void;
}

export const SearchPlaceDropdown = ({
  places,
  setSelected
}: SearchPlaceDropdownProps) => {
  return (
    <Results>
      {places.map(place => (
        <SearchPlaceResult
          key={place.foursquareId}
          place={place}
          select={() => setSelected(place)}
        />
      ))}
    </Results>
  );
};
