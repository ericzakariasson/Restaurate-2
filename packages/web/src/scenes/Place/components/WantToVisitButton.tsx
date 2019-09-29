import { Button } from 'components';
import {
  usePlaceQuery,
  useToggleWantToVisitMutation,
  useWantToVisitPlaceQuery,
  WantToVisitListDocument,
  WantToVisitPlaceDocument,
  WantToVisitPlaceQuery,
  WantToVisitPlaceQueryVariables
} from 'graphql/types';
import * as React from 'react';
import { Plus, X } from 'react-feather';
import styled from 'styled-components';
import { ActionButton } from '../../../components/ActionButton';

const ButtonText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface WantToVisitButtonProps {
  providerId: string;
}

export const WantToVisitButton = ({ providerId }: WantToVisitButtonProps) => {
  const { data, loading } = usePlaceQuery({ variables: { providerId } });

  const {
    data: wantToVisitData,
    loading: loadingWantToVisit
  } = useWantToVisitPlaceQuery({ variables: { providerId } });

  const [toggleWantToVisit, { loading: saving }] = useToggleWantToVisitMutation(
    {
      variables: { providerPlaceId: providerId },
      refetchQueries: [{ query: WantToVisitListDocument }],
      update(cache, { data }) {
        try {
          cache.writeQuery<
            WantToVisitPlaceQuery,
            WantToVisitPlaceQueryVariables
          >({
            query: WantToVisitPlaceDocument,
            variables: { providerId },
            data: {
              wantToVisitPlace: data!.toggleWantToVisit
            }
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  );

  if (loading || loadingWantToVisit) {
    return null;
  }

  const hasVisited = data && data.place && data.place.hasVisited;

  if (hasVisited) {
    return null;
  }

  const wantToVisit = wantToVisitData && wantToVisitData.wantToVisitPlace;

  return (
    <Button
      text={
        <ButtonText>
          {wantToVisit ? 'Ta bort' : 'Vill besöka'}
          <ActionButton
            as="span"
            icon={wantToVisit ? X : Plus}
            iconProps={{ size: 16, color: '#666' }}
          />
        </ButtonText>
      }
      variant="secondary"
      color="white"
      size="normal"
      margin={['right']}
      loading={saving}
      onClick={() => toggleWantToVisit()}
    />
  );
};
