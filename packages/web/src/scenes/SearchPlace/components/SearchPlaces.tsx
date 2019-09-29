import * as React from 'react';
import styled from 'styled-components';
import { PlaceItem } from './PlaceItem';
import { PlaceDetailsBasic } from 'graphql/types';
import { previewPlaceRoute } from 'routes';

const Count = styled.p`
  margin-top: 40px;
  margin-bottom: 10px;
`;

const Results = styled.ul`
  margin: 0;
  padding: 0 0 20px 0;
  list-style: none;
`;

interface SearchPlacesProps {
  places: PlaceDetailsBasic[];
}

export const SearchPlaces = ({ places }: SearchPlacesProps) => {
  const hasResults = places.length > 0;
  return (
    <>
      {hasResults && <Count>{places.length} resultat</Count>}
      <Results>
        {places.map(place => (
          <PlaceItem
            key={place.providerId}
            to={previewPlaceRoute({ providerId: place.providerId })}
            place={place}
          />
        ))}
      </Results>
    </>
  );
};
