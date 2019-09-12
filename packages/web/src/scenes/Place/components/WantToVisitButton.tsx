import * as React from 'react';
import { Button } from 'components';
import { X, Plus } from 'react-feather';
import styled from 'styled-components';
import { ActionButton } from './ActionButton';
import {
  useToggleWantToVisitMutation,
  PlaceDocument,
  PlaceQuery
} from 'graphql/types';
import { DataProxy } from 'apollo-cache';

const ButtonText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const updateWantToVisit = (providerId: string) => (cache: DataProxy) => {
  const placeQuery = {
    query: PlaceDocument,
    variables: { providerId }
  };

  const { place } = cache.readQuery<PlaceQuery>(placeQuery)!;

  const updatedQuery = {
    ...placeQuery,
    data: {
      place: {
        ...place,
        wantToVisit: !place!.wantToVisit
      }
    }
  };

  cache.writeQuery(updatedQuery);
};

interface WantToVisitButtonProps {
  providerId: string;
  wantToVisit: boolean;
}

export const WantToVisitButton = ({
  providerId,
  wantToVisit
}: WantToVisitButtonProps) => {
  const [toggleWantToVisit, { loading }] = useToggleWantToVisitMutation({
    variables: { providerId },
    update: updateWantToVisit(providerId)
  });

  return (
    <Button
      text={
        <ButtonText>
          {wantToVisit ? 'Vill besöka' : 'Lägg till i vill besöka'}
          <ActionButton
            as="span"
            icon={
              wantToVisit ? (
                <X size={16} color="#666" />
              ) : (
                <Plus size={16} color="#666" />
              )
            }
          />
        </ButtonText>
      }
      variant="secondary"
      color="white"
      margin={['bottom']}
      loading={loading}
      onClick={() => toggleWantToVisit()}
    />
  );
};
