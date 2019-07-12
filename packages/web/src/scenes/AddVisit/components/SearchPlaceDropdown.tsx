import * as React from 'react';
import styled from 'styled-components';
import { Places } from '../../../hooks/useGooglePlaces';

import { SearchPlaceType } from './SearchPlaceType';

const Types = styled.section`
  padding: 20px 5px;
`;

interface SearchPlaceDropdownProps {
  types: string[];
  places: Places;
  loading: boolean;
  setSelected: (place: google.maps.places.PlaceResult) => void;
}

export const SearchPlaceDropdown = ({
  types,
  places,
  setSelected
}: SearchPlaceDropdownProps) => {
  return (
    <Types>
      {types.map(type => (
        <SearchPlaceType
          key={type}
          type={type}
          data={places.data[type]}
          select={setSelected}
        />
      ))}
    </Types>
  );
};
