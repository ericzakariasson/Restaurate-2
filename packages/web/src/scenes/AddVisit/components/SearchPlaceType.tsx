import * as React from 'react';
import styled from 'styled-components';
import { SearchTypeData } from '../types/place';
import { SearchPlaceResult } from './SearchPlaceResult';
import { SmallLabel } from '../../../components/Label';
import { formatPlaceType } from '../../../utils/format';
import { PlaceType } from '../../../graphql/types';

const Wrapper = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const TypeName = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 10px;
  font-weight: 400;
`;

const ResultWrapper = styled.div``;

const Results = styled.ul`
  margin: 0 -10px;
`;

const NoResults = styled.p`
  color: #ccc;
`;

interface SearchPlaceTypeProps {
  type: string;
  data: SearchTypeData;
  select: (place: any) => void;
}

export const SearchPlaceType = ({
  type,
  data,
  select
}: SearchPlaceTypeProps) => {
  const results = data.results as [];
  return (
    <Wrapper>
      <TypeName>
        {formatPlaceType(type as PlaceType)} – {results.length}
      </TypeName>
      <ResultWrapper>
        <SmallLabel textAlign="left" text="Sökresultat" marginBottom="5px" />
        <Results>
          {results.length > 0 ? (
            results.map((result: google.maps.places.PlaceResult) => (
              <SearchPlaceResult
                key={result.place_id}
                result={result}
                select={() => select(result)}
              />
            ))
          ) : (
            <NoResults>
              Inga resultat för{' '}
              {formatPlaceType(type as PlaceType).toLowerCase()}
            </NoResults>
          )}
        </Results>
      </ResultWrapper>
    </Wrapper>
  );
};
