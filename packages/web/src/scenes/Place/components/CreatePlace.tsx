import * as React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { Button } from 'components';
import {
  useCreatePlaceMutation,
  PlaceDocument,
  PlaceQueryVariables,
  PlaceQuery
} from 'graphql/types';
import { myPlaceRoute } from 'routes';

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: #f5f5f5;
  margin: 15px 0 30px;
`;

const CreateText = styled.p`
  color: #444;
  margin-bottom: 20px;
  line-height: 1.5;
`;
interface CreatePlaceProps {
  providerId: string;
}

export const CreatePlace = ({ providerId }: CreatePlaceProps) => {
  const variables = {
    providerId
  };

  const [
    createPlace,
    { data: createPlaceData, loading: saving }
  ] = useCreatePlaceMutation({
    variables,
    update(cache, { data }) {
      cache.writeQuery<PlaceQuery, PlaceQueryVariables>({
        query: PlaceDocument,
        variables: { providerId },
        data: {
          place: { ...data!.createPlace!, visits: [] }
        }
      });
    }
  });

  if (
    createPlaceData &&
    createPlaceData.createPlace &&
    createPlaceData.createPlace.id
  ) {
    return <Redirect to={myPlaceRoute({ providerId })} />;
  }

  return (
    <Wrapper>
      <CreateText>
        För att spara info om stället som prisklass och taggar behöver du lägga
        till det i dina ställen.
      </CreateText>
      <Button
        variant="secondary"
        color="black"
        text="Lägg till i mina ställen"
        onClick={() => createPlace()}
        loading={saving}
        size="normal"
      />
    </Wrapper>
  );
};
