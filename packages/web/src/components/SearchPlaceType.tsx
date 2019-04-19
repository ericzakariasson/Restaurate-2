import React from 'react';
import styled from 'styled-components';
import { PlaceType, SearchTypeData } from '../types/places';
import { SearchPlaceResult } from './SearchPlaceResult';

const Wrapper = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const TypeName = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 10px;
  font-weight: 400;
`;

const ResultWrapper = styled.div``;

const ResultType = styled.span`
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #4d4a45;
  font-weight: 500;
  display: block;
`;

const Results = styled.ul``;

const NoResults = styled.p`
  color: #ccc;
`;

interface SearchPlaceTypeProps {
  type: PlaceType;
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
        {type.label} – {results.length}
      </TypeName>
      <ResultWrapper>
        <ResultType>Sökresultat</ResultType>
        <Results>
          {results.length > 0 ? (
            results.map((result: google.maps.places.PlaceResult) => (
              <SearchPlaceResult
                key={result.id}
                result={result}
                select={() => select(result)}
              />
            ))
          ) : (
            <NoResults>Inga resultat för {type.label.toLowerCase()}</NoResults>
          )}
        </Results>
      </ResultWrapper>
    </Wrapper>
  );
};
