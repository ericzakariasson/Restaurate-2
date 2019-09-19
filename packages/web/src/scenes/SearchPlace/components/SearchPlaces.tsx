import * as React from 'react';
import styled from 'styled-components';
import { PlaceItem } from './PlaceItem';
import { PoweredBy } from 'components';
import { PlaceDetailsBasic } from 'graphql/types';

const Results = styled.ul`
  margin: 0 -10px;
  padding: 20px 0;
  list-style: none;
`;

interface SearchPlacesProps {
  places: PlaceDetailsBasic[];
}

export const SearchPlaces = ({ places }: SearchPlacesProps) => {
  return (
    <>
      <Results>
        {places.map(place => (
          <PlaceItem key={place.providerId} place={place} />
        ))}
      </Results>
      {places.length > 0 && <PoweredBy margin={['top']} />}
    </>
  );
};
