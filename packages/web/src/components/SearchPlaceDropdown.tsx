import * as React from 'react';
import styled from 'styled-components';
import { Places } from '../hooks/useGooglePlaces';

import { PlaceType } from '../types/place';
import { SearchPlaceType } from './SearchPlaceType';

const Types = styled.section`
  padding: 20px 5px;
`;

interface SearchPlaceDropdownProps {
  types: PlaceType[];
  places: Places;
  loading: boolean;
  setSelected: (place: google.maps.places.PlaceResult) => void;
}

export const SearchPlaceDropdown = ({
  types,
  places,
  loading,
  setSelected
}: SearchPlaceDropdownProps) => {
  return (
    <Types>
      {types.map((type: PlaceType) => (
        <SearchPlaceType
          key={type.value}
          type={type}
          data={places.data[type.value]}
          select={setSelected}
        />
      ))}
    </Types>
  );
};
