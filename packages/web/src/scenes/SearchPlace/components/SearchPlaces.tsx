import * as React from 'react';
import styled from 'styled-components';
import { PlaceSearchItem } from 'graphql/types';
import { PlaceItem } from './PlaceItem';
import { PoweredBy } from 'components';

const Results = styled.ul`
  margin: 0 -10px;
  padding: 20px 0;
  list-style: none;
`;

interface SearchPlacesProps {
  places: PlaceSearchItem[];
}

export const SearchPlaces = ({ places }: SearchPlacesProps) => {
  return (
    <>
      <Results>
        {places.map(place => (
          <PlaceItem key={place.providerPlaceId} place={place} />
        ))}
      </Results>
      {places.length > 0 && <PoweredBy margin={['top']} />}
    </>
  );
};
